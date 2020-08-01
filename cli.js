#!/usr/bin/env node
/* eslint-disable no-console */
require = require('esm')(module); // eslint-disable-line no-global-assign
const meow = require('meow');
const inquirer = require('inquirer');
const main = require('./src/main').default;
const writeToFile = require('./src/utils/writeToFile').default;
const generators = require('./src/generators').default;
const services = require('./src/services').default;
const settings = require('./src/settings').default;

const logger = {
  log: msg => console.log(msg),
  info: msg => console.warn(`\n ℹ️ Info: ${msg}`),
  warn: msg => console.warn(`\n⚠️  Warning: ${msg}\n`),
  error: msg => console.error(`\n❌  Error: ${msg}\n`),
};

const generatorDict = {
  users: generators.users,
  'enrollment-adds': generators.enrollAdds,
  'enrollment-drops': generators.enrollDrops,
  'enrollment-faculty': generators.enrollFaculty,
  'enrollment-sandboxes': generators.enrollSandbox,
  'course-shells': generators.courseShells,
  'course-sandboxes': generators.courseSandboxes,
  'course-updates': generators.courseUpdates,
  sections: generators.sections,
};

const isValidGenerator = str => Object.keys(generatorDict).includes(str);

const listGeneratorsInCLI = ({ indentSize = 8, indentFirst = true }) =>
  Object.keys(generatorDict)
    // should the first generator be indented?
    // this is helpful if this function generates a list
    // in another string template
    .map((str, i) => (!indentFirst && i === 0 ? str : ' '.repeat(indentSize) + str))
    .join('\n');

async function promptUser() {
  const { generatorKey, destinations } = await inquirer.prompt([
    {
      type: 'list',
      name: 'generatorKey',
      message: 'What do you want to generate?',
      choices: Object.keys(generatorDict),
    },
    {
      type: 'checkbox',
      name: 'destinations',
      message: 'Destinations? (in addition to stdout)',
      choices: ['file', 'upload'],
    },
  ]);

  const userChoices = {
    generatorKey,
    destinations: {
      file: destinations.includes('file'),
      upload: destinations.includes('upload'),
    },
  };

  if (!userChoices.destinations.upload) return userChoices;

  const followups = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'uploadOptions',
      message: 'Upload Options?',
      choices: ['override_sis_stickiness'],
    },
  ]);
  return {
    ...userChoices,
    uploadOptions: {
      override_sis_stickiness: followups.uploadOptions.includes('override_sis_stickiness'),
    },
  };
}

async function cli() {
  const { flags, input } = meow(
    `
      Usage
        $ canvas-jenzabar <generator> <options>
   

      Generators
        ${listGeneratorsInCLI({ indentSize: 8, indentFirst: false })}

      Options
        --help                      help and options
        --file                      save csv to a file in \`./tmp\` folder
        --upload                    upload csv to Canvas via SIS Imports
        --override-sis-stickiness   on csv upload, override any sis stickiness
   
      Example
        $ canvas-jenzabar users --upload
  `,
    {
      flags: {
        file: { type: 'boolean' },
        upload: { type: 'boolean' },
        overrideSisStickiness: { type: 'boolean' },
      },
    }
  );

  if (flags.overrideSisStickiness && !flags.upload) {
    logger.error(`option '--override-sis-stickiness' can only be used with '--upload`);
    process.exit();
  }

  let generatorKey = input ? input[0] : null;
  let destinations = {
    file: flags.file,
    upload: flags.upload,
  };

  let uploadOptions = {
    override_sis_stickiness: flags.overrideSisStickiness,
  };

  // if input is given and invalid, error
  if (generatorKey && !isValidGenerator(generatorKey)) {
    logger.error(
      `${generatorKey} is not a valid generator. Use --help option to see valid generators.`
    );
  }

  logger.log(`
  🌕  CANVAS HOST:\t${settings.canvas.hostname}
  🔵  JENZABAR HOST:\t${settings.jex.server}
  🕐  DATETIME:\t\t${new Date()}
  `);

  // if no generator given as cli input
  // prompt user for generator and destination
  if (!generatorKey) {
    const answers = await promptUser();
    ({ generatorKey, destinations, uploadOptions } = answers);
  }

  const generatorFn = generatorDict[generatorKey];

  try {
    const csv = await main(generatorFn);
    logger.log(csv);
    logger.info(JSON.stringify(destinations));

    if (csv.length === 0) {
      logger.log('🤓  No data generated. Done!');
      return;
    }

    if (destinations.file) {
      // save to file
      const fileDest = await writeToFile(csv, { filenamePrefix: generatorKey });
      logger.log(`👍  Saving to file: ${fileDest}`);
    }

    if (destinations.upload) {
      // upload to canvas
      logger.log(`⤴️  Uploading Data to: ${settings.canvas.hostname}`);
      const uploadUrl = [
        `/accounts/1/sis_imports?extensions=csv`,
        uploadOptions.override_sis_stickiness ? `&override_sis_stickiness=true` : '',
      ].join('');

      const res = await services.canvas.post(uploadUrl, csv);
      logger.info(`Response: ${JSON.stringify(res)}`);
    }
  } catch (err) {
    console.error(err.message);
  }
}

cli();

#!/usr/bin/env node
require = require('esm')(module); // eslint-disable-line no-global-assign
const meow = require('meow');
const inquirer = require('inquirer');
const main = require('./src/main').default;
const writeToFile = require('./src/utils/writeToFile').default;
const generators = require('./src/generators').default;
const services = require('./src/services').default;
const settings = require('./src/settings').default;

const { log, warn } = console;

const generatorDict = {
  users: generators.users,
  'enrollment-adds': generators.enrollAdds,
  'enrollment-drops': generators.enrollDrops,
  'enrollment-faculty': generators.enrollFaculty,
  'enrollment-sandboxes': generators.enrollSandbox,
  courses: generators.courses,
  sections: generators.sections,
  sandboxes: generators.sandboxes,
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
  const answers = await inquirer.prompt([
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

  return {
    generatorKey: answers.generatorKey,
    destinations: {
      upload: answers.destinations.some(dest => dest === 'upload'),
      file: answers.destinations.some(dest => dest === 'file'),
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
        --help              This help text.
        --file              save csv to a file in \`./tmp\` folder
        --upload            upload csv to Canvas via SIS Imports
   
      Example
        $ canvas-jenzabar users --upload
  `,
    {
      flags: {
        file: { type: 'boolean' },
        upload: { type: 'boolean' },
      },
    }
  );

  let generatorKey = input ? input[0] : null;
  let destinations = flags;

  // if input is given and invalid, error
  if (generatorKey && !isValidGenerator(generatorKey)) {
    warn(
      `\n❌  Error: ${generatorKey} is not a valid generator. Use --help option to see valid generators.`
    );
  }

  // to stderr to keep stdout clean
  // TODO: Better logging
  warn(`
  🌕  CANVAS HOST:\t${settings.canvas.hostname}
  🔵  JENZABAR HOST:\t${settings.jex.server}
  🕐  DATETIME:\t\t${new Date()}
  `);

  // if no generator given as cli input
  // prompt user for generator and destination
  if (!generatorKey) {
    const answers = await promptUser();
    ({ generatorKey, destinations } = answers);
  }

  const generatorFn = generatorDict[generatorKey];

  try {
    const csv = await main(generatorFn);
    log(csv);

    warn(destinations);

    if (csv.length === 0) {
      warn('🤓  No data generated. Done!');
      return;
    }

    if (destinations.file) {
      // save to file
      const fileDest = await writeToFile(csv, { filenamePrefix: generatorKey });
      warn(`\n👍  Saving to file: ${fileDest}`);
    }

    if (destinations.upload) {
      // upload to canvas
      log(`\n⤴️  Uploading Data to: ${settings.canvas.hostname}`);
      const url = '/accounts/1/sis_imports?extension=csv';
      const res = await services.canvas.post(url, csv);
      warn(`Response: ${JSON.stringify(res)}`);
    }
  } catch (err) {
    console.error(`\n ❌ ${err.message}`);
    throw err;
  }
}

cli();

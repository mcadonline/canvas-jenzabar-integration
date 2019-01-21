import settings from './settings';
import services from './services';

const { warn } = console;

export default async function main(generatorFn) {
  // to stderr to keep stdout clean
  // TODO: Better logging
  warn(`
  🌕  CANVAS HOST:\t${settings.canvas.hostname}
  🔵  JENZABAR HOST:\t${settings.jex.server}
  `);

  if (typeof generatorFn !== 'function') {
    throw new TypeError(`Invalid function: ${JSON.stringify(generatorFn)}`);
  }

  const csv = await generatorFn(services);
  services.jex.close();
  return csv;
}

import services from './services/index.js';

export default async function main(generatorFn) {
  if (typeof generatorFn !== 'function') {
    throw new TypeError(`Invalid function: ${JSON.stringify(generatorFn)}`);
  }

  const csv = await generatorFn();
  services.jex.close();
  return csv;
}

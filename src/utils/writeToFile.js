import path from 'path';
import { promise as write } from 'write';
import { DateTime } from 'luxon';
import settings from '../settings';

const getTimestamp = () => DateTime.local()
  .toISODate()
  .split('-')
  .join('');

// get everything but the instructure.com
const getShortHostname = hostname => hostname
  .split('.')
  .slice(0, -2)
  .join('.');

const normalizeString = str => str
  .split(' ')
  .join('')
  .toLowerCase();

export default async function writeToFile(contents, { filenamePrefix = 'ff' }) {
  const filename = [
    normalizeString(filenamePrefix),
    getShortHostname(settings.canvas.hostname),
    getTimestamp(),
  ]
    .join('-')
    .concat('.csv');
  const fileDest = path.join(__dirname, '../tmp', filename);
  try {
    await write(fileDest, contents);
    return fileDest;
  } catch (err) {
    console.warn(`\n❌ Unable to write to ${fileDest}: ${err.message}`);
    throw err;
  }
}

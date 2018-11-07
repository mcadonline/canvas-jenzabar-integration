import { difference, differenceWith } from 'ramda';
import jexService from './services/jex';
import canvasService from './services/canvas';

const GENERATE_USERS_CSV = 'GENERATE_USERS_CSV';

function setMinus(collectionA, collectionB, idKeyName) {
  if (!idKeyName) return difference(collectionA, collectionB);

  const idsAreEqual = (x, y) => x[idKeyName] === y[idKeyName];
  return differenceWith(idsAreEqual, collectionA, collectionB);
}

const toCSVString = arr => `"${arr.join('","')}"`;

function jsonToCSV(collection) {
  if (!collection.length) return '';

  // assume first obj is complete
  const headers = Object.keys(collection[0]);
  const records = collection.map(record => headers.map(header => record[header] || null));

  return [headers, ...records].map(toCSVString).join('\n');
}

const defaultArgs = {
  action: GENERATE_USERS_CSV,
  services: {
    jex: jexService,
    canvas: canvasService,
  },
};

export default async function main({ action, services } = defaultArgs) {
  const { jex, canvas } = services;

  if (action === GENERATE_USERS_CSV) {
    const jexUsers = await jex.getUsers();
    const canvasUsers = await canvas.getUsers();
    const newCanvasUsers = setMinus(jexUsers, canvasUsers, 'id');
    const csv = jsonToCSV(newCanvasUsers);
    console.log(csv);
    return csv;
  }

  return null;
}

import settings from './settings';
import jex from './services/jex';
import canvas from './services/canvas';
import jsonToCSV from './utils/jsonToCSV';
import setMinus from './utils/setMinus';
import * as C from './constants';

export default async function main(action) {
  console.warn(`
  ☁️  CANVAS HOST:\t${settings.canvas.hostname}
  🤖  JENZABAR HOST:\t${settings.jex.server}
  `);

  if (action === C.GENERATE_USERS_CSV) {
    const jexUsers = await jex.getUsers();
    const canvasUsers = await canvas.getUsers();
    const newCanvasUsers = setMinus(jexUsers, canvasUsers, 'user_id');
    const csv = jsonToCSV(newCanvasUsers);
    return csv;
  }

  return null;
}

import jexService from './services/jex';
import canvasService from './services/canvas';
import jsonToCSV from './utils/jsonToCSV';
import setMinus from './utils/setMinus';

const GENERATE_USERS_CSV = 'GENERATE_USERS_CSV';

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
    const newCanvasUsers = setMinus(jexUsers, canvasUsers, 'user_id');
    const csv = jsonToCSV(newCanvasUsers);
    console.log(csv);
    return csv;
  }

  return null;
}

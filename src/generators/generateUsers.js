import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';

export default async ({ jex, canvas }) => {
  const [jexUsers, canvasUsers] = await Promise.all([jex.getUsers(), canvas.getUsers()]);
  const newCanvasUsers = setMinus(jexUsers, canvasUsers);

  return jsonToCSV(newCanvasUsers);
};

import settings from './settings';
import jex from './services/jex';
import canvas from './services/canvas';
import jsonToCSV from './utils/jsonToCSV';
import setMinus from './utils/setMinus';
import generateEnrollAdds from './generators/generateEnrollAdds';
import * as C from './constants';

const { warn } = console;

export default async function main(action) {
  // to stderr to keep stdout clean
  // TODO: Better logging?
  warn(`
  🌕  CANVAS HOST:\t${settings.canvas.hostname}
  🔵  JENZABAR HOST:\t${settings.jex.server}
  `);

  if (action === C.GENERATE_USERS_CSV) {
    const [jexUsers, canvasUsers] = await Promise.all([jex.getUsers(), canvas.getUsers()]);
    const newCanvasUsers = setMinus(jexUsers, canvasUsers);
    const csv = jsonToCSV(newCanvasUsers);
    return csv;
  }

  if (action === C.GENERATE_COURSES_CSV) {
    const [jexCourses, canvasCourses] = await Promise.all([jex.getCourses(), canvas.getCourses()]);
    const newCanvasCourses = setMinus(jexCourses, canvasCourses);
    const csv = jsonToCSV(newCanvasCourses);
    return csv;
  }

  if (action === C.GENERATE_ENROLLADDS_CSV) {
    return generateEnrollAdds({ jex, canvas });
  }

  warn('No action chosen. Doing nothing.');

  return null;
}

import canvas from '../services/canvas/index.js';
import jex from '../services/jex/index.js';
import setMinus from '../utils/setMinus.js';
import jsonToCSV from '../utils/jsonToCSV.js';

export default async () => {
  const [canvasUsers, jexEnrollment, jexInstructors] = await Promise.all([
    canvas.getUsers(),
    jex.getStudentEnrollment(),
    jex.getInstructors(),
  ]);

  // These are the users who SHOULD be in Canvas
  const sisUsersFromJex = jex.toSisUsers([...jexEnrollment, ...jexInstructors]);

  // These are the users who ARE in Canvas
  const sisUsersInCanvas = canvas.toSisUsers(canvasUsers);

  // find the difference to see who should be added
  const newCanvasUsers = setMinus(sisUsersFromJex, sisUsersInCanvas);
  return jsonToCSV(newCanvasUsers);
};

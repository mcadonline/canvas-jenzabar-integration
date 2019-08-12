import canvas from '../services/canvas';
import jex from '../services/jex';
import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';
import getActiveJexEnrollment from '../utils/getActiveJexEnrollment';

export default async () => {
  const [activeCanvasSections, jexEnrollment, canvasUsers] = await Promise.all([
    canvas.getActiveSections(),
    jex.getStudentEnrollment(),
    canvas.getUsers(),
  ]);

  // jex enrollees with an active canvas section
  const activeJexEnrollment = getActiveJexEnrollment({
    activeCanvasSections,
    jexEnrollment,
  });

  // These are the users who SHOULD be in Canvas
  const sisUsersFromJex = jex.toSisUsers(activeJexEnrollment);

  // These are the users who ARE in Canvas
  const sisUsersInCanvas = canvas.toSisUsers(canvasUsers);

  // find the difference to see who should be added
  const newCanvasUsers = setMinus(sisUsersFromJex, sisUsersInCanvas);
  return jsonToCSV(newCanvasUsers);
};

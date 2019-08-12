import canvas from '../services/canvas';
import jex from '../services/jex';
import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';
import toCourseId from '../utils/toCourseId';

export default async () => {
  const [activeCanvasSections, studentEnrollment, canvasUsers] = await Promise.all([
    canvas.getActiveSections(),
    jex.getStudentEnrollment(),
    canvas.getUsers(),
  ]);

  // createa lookup table so that we can see which
  // of our jex students may be in an active canvas section
  const activeSectionIdLookup = activeCanvasSections
    .map(s => s.sis_section_id)
    .reduce((acc, id) => ({ ...acc, [id]: true }), {});

  const jexEnrolleesWithActiveCanvasSections = studentEnrollment.filter(
    ({ courseCode, term, year }) => {
      const sectionId = toCourseId({ courseCode, term, year });
      const isInActiveSection = !!activeSectionIdLookup[sectionId];
      return isInActiveSection;
    },
  );

  // to compare canvas and jex enrollees we need to convert to a common
  // sis format

  // These are the users who SHOULD be in Canvas
  const sisUsersFromJex = jex.toSisUsers(jexEnrolleesWithActiveCanvasSections);

  // These are the users who ARE in Canvas
  const sisUsersInCanvas = canvas.toSisUsers(canvasUsers);

  // find the difference to see who should be added
  const newCanvasUsers = setMinus(sisUsersFromJex, sisUsersInCanvas);
  return jsonToCSV(newCanvasUsers);
};

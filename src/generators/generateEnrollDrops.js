import canvas from '../services/canvas';
import jex from '../services/jex';
import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';
import settings from '../settings';
import getActiveJexEnrollment from '../utils/getActiveJexEnrollment';

// const defaultUsersToIgnore = settings.ignoreUsers;

export default async ({ ignoreUsers } = { ignoreUsers: settings.ignoreUsers }) => {
  const [activeCanvasSections, canvasEnrollment, jexEnrollment] = await Promise.all([
    canvas.getActiveSections(),
    canvas.getStudentEnrollment(),
    jex.getStudentEnrollment(),
  ]);

  // jex enrollees with an active canvas section
  const activeJexEnrollment = getActiveJexEnrollment({
    activeCanvasSections,
    jexEnrollment,
  });

  // These are the enrollments which SHOULD be in Canvas
  const sisEnrollmentsFromJex = jex.toSisEnrollment(activeJexEnrollment);

  // Enrollments which currently ARE in Canvas
  const sisEnrollmentsFromCanvas = canvas.toSisEnrollment(canvasEnrollment);

  const enrollmentsToDrop = setMinus(sisEnrollmentsFromCanvas, sisEnrollmentsFromJex)
    .filter(enrollment => !ignoreUsers.includes(enrollment.user_id))
    // only process drops from truthy section ids
    // ignoring any null or "" sections
    .filter(enrollment => !!enrollment.section_id)
    .map(enrollment => ({ ...enrollment, status: 'deleted' }));

  return jsonToCSV(enrollmentsToDrop);
};

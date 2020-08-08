import canvas from '../services/canvas';
import jex from '../services/jex';
import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';
import filterForEnrollmentInActiveCanvasSections from '../utils/filterForEnrollmentInActiveCanvasSections';

export default async () => {
  const [activeCanvasSections, canvasEnrollment, jexEnrollment] = await Promise.all([
    canvas.getActiveSections(),
    canvas.getStudentEnrollment(),
    jex.getStudentEnrollment(),
  ]);

  // jex enrollees with an active canvas section
  const jexEnrolleesInActiveCanvasSections = filterForEnrollmentInActiveCanvasSections({
    activeCanvasSections,
    jexEnrollment,
  });

  // These are the enrollments which SHOULD be in Canvas
  const sisEnrollmentsFromJex = jex.toSisEnrollment(jexEnrolleesInActiveCanvasSections);

  // Enrollments which currently ARE in Canvas
  const sisEnrollmentsFromCanvas = canvas.toSisEnrollment(canvasEnrollment);

  const enrollmentsToAdd = setMinus(sisEnrollmentsFromJex, sisEnrollmentsFromCanvas);

  return jsonToCSV(enrollmentsToAdd);
};

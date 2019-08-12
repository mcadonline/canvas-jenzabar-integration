import canvas from '../services/canvas';
import jex from '../services/jex';
import setMinus from '../utils/setMinus';
import toCourseId from '../utils/toCourseId';
import jsonToCSV from '../utils/jsonToCSV';

export default async () => {
  const [activeCanvasSections, canvasEnrollment, jexEnrollment] = await Promise.all([
    canvas.getActiveSections(),
    canvas.getStudentEnrollment(),
    jex.getStudentEnrollment(),
  ]);

  // createa lookup table so that we can see which
  // of our jex students may be in an active canvas section
  const activeSectionIdLookup = activeCanvasSections
    .map(s => s.sis_section_id)
    .reduce((acc, id) => ({ ...acc, [id]: true }), {});

  const jexEnrolleesWithActiveCanvasSections = jexEnrollment.filter(
    ({ courseCode, term, year }) => {
      const sectionId = toCourseId({ courseCode, term, year });
      const isInActiveSection = !!activeSectionIdLookup[sectionId];
      return isInActiveSection;
    },
  );

  // These are the enrollments which SHOULD be in Canvas
  const sisEnrollmentsFromJex = jex.toSisEnrollment(jexEnrolleesWithActiveCanvasSections);

  // Enrollments which currently ARE in Canvas
  const sisEnrollmentsFromCanvas = canvas.toSisEnrollment(canvasEnrollment);

  const enrollmentsToAdd = setMinus(sisEnrollmentsFromJex, sisEnrollmentsFromCanvas);

  return jsonToCSV(enrollmentsToAdd);
};

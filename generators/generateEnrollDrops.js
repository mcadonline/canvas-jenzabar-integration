import canvas from '../services/canvas/index.js';
import jex from '../services/jex/index.js';
import setMinus from '../utils/setMinus.js';
import jsonToCSV from '../utils/jsonToCSV.js';
import filterForEnrollmentInActiveCanvasSections from '../utils/filterForEnrollmentInActiveCanvasSections.js';

function onlyEnrollmentFromActiveJexCourse(activeJexCourses = []) {
  const jexCourseLookup = {};

  activeJexCourses.forEach((jexCourse) => {
    jexCourseLookup[jexCourse.id] = true;
  });

  return (enrollment) => !!jexCourseLookup[enrollment.section_id];
}

export default async () => {
  const [activeCanvasSections, canvasEnrollment, jexEnrollment, jexCourses] = await Promise.all([
    canvas.getActiveSections(),
    canvas.getStudentEnrollment(),
    jex.getStudentEnrollment(),
    jex.getActiveCourses(),
  ]);

  // jex enrollees with an active canvas section
  const activeJexEnrollment = filterForEnrollmentInActiveCanvasSections({
    activeCanvasSections,
    jexEnrollment,
  });

  // These are the enrollments which SHOULD be in Canvas
  const sisEnrollmentsFromJex = jex.toSisEnrollment(activeJexEnrollment);

  // Enrollments which currently ARE in Canvas
  const sisEnrollmentsFromCanvas = canvas.toSisEnrollment(canvasEnrollment);

  const enrollmentsToDrop = setMinus(sisEnrollmentsFromCanvas, sisEnrollmentsFromJex)
    // ignore drops from courses no longer active in Jex
    .filter(onlyEnrollmentFromActiveJexCourse(jexCourses))
    // only process drops from truthy section ids
    // ignoring any null or "" sections
    .filter((enrollment) => !!enrollment.section_id)
    .map((enrollment) => ({ ...enrollment, status: 'deleted' }));

  return jsonToCSV(enrollmentsToDrop);
};

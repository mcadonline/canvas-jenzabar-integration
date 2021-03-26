import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex.js';
import getActiveCoursesFromJex from './getActiveCoursesFromJex.js';
import toSisEnrollment from './toSisEnrollmentFromJexEnrollment.js';
import toSisUsers from './toSisUsersFromJexEnrollment.js';
import toSisSections from './toSisSectionsFromJexCourses.js';
import jexService from './jexService.js';
import getInstructorsFromJex from './getInstructorsFromJex.js';

const jex = {
  getInstructors: getInstructorsFromJex,
  getStudentEnrollment: getStudentEnrollmentFromJex,
  getActiveCourses: getActiveCoursesFromJex,
  close: jexService.close,
  toSisUsers,
  toSisEnrollment,
  toSisSections,
};

export default jex;

import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';
import getActiveCoursesFromJex from './getActiveCoursesFromJex';
import toSisEnrollment from './toSisEnrollmentFromJexEnrollment';
import toSisUsers from './toSisUsersFromJexEnrollment';
import toSisSections from './toSisSectionsFromJexCourses';
import jexService from './jexService';

const jex = {
  getStudentEnrollment: getStudentEnrollmentFromJex,
  getActiveCourses: getActiveCoursesFromJex,
  close: jexService.close,
  toSisUsers,
  toSisEnrollment,
  toSisSections,
};

export default jex;

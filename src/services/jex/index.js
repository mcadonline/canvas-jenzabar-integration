import createSQLService from '../createSQLService';
import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';
import getActiveCoursesFromJex from './getActiveCoursesFromJex';
import toSisEnrollment from './toSisEnrollmentFromJexEnrollment';
import toSisUsers from './toSisUsersFromJexEnrollment';
import toSisSections from './toSisSectionsFromJexCourses';

const jexService = createSQLService('jex');

const jex = {
  getStudentEnrollment: getStudentEnrollmentFromJex(jexService),
  getActiveCourses: getActiveCoursesFromJex(jexService),
  close: jexService.close,
  toSisUsers,
  toSisEnrollment,
  toSisSections,
};

export default jex;

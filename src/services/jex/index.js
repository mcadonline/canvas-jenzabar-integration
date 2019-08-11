import { uniq } from 'ramda';
import createSQLService from '../createSQLService';
import getStudentsFromJex from './getStudentsFromJex';
import getInstructorsFromJex from './getInstructorsFromJex';
import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';
import getActiveCoursesFromJex from './getActiveCoursesFromJex';
import toSisEnrollment from './toSisEnrollmentFromJexEnrollment';
import toSisUser from './toSisUserFromJexUser';

const jexService = createSQLService('jex');

/**
 * gets both faculty and students
 * @param {} jexServ - instance of jex service
 */
const getUsers = jexServ => async () => {
  const getStudents = getStudentsFromJex(jexServ);
  const getInstructors = getInstructorsFromJex(jexServ);
  const [students, faculty] = await Promise.all([getStudents(), getInstructors()]);
  return uniq(students.concat(faculty));
};

const jex = {
  getInstructors: getInstructorsFromJex(jexService),
  getStudents: getStudentsFromJex(jexService),
  getUsers: getUsers(jexService),
  getStudentEnrollment: getStudentEnrollmentFromJex(jexService),
  getActiveCourses: getActiveCoursesFromJex(jexService),
  close: jexService.close,
  toSisUser,
  toSisEnrollment,
};

export default jex;

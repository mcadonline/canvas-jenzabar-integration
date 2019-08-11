import getUsersFromCanvas from './getUsersFromCanvas';
import getCoursesFromCanvas from './getCoursesFromCanvas';
import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas';
import getStudentEnrollmentFromCanvas from './getStudentEnrollmentFromCanvas';
import getActiveSections from './getActiveSectionsFromCanvas';
import postToCanvas from './postToCanvas';
import toSisEnrollment from './toSisEnrollmentFromCanvasEnrollment';
import toSisSections from './toSisSectionsFromCanvasSections';
import toSisUsers from './toSisUsersFromCanvasUsers';

export default {
  getUsers: getUsersFromCanvas,
  getCourses: getCoursesFromCanvas,
  getActiveCourses: getActiveCoursesFromCanvas,
  getActiveSections,
  getStudentEnrollment: getStudentEnrollmentFromCanvas,
  post: postToCanvas,
  toSisEnrollment,
  toSisSections,
  toSisUsers,
};

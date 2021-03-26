import getUsersFromCanvas from './getUsersFromCanvas.js';
import getCoursesFromCanvas from './getCoursesFromCanvas.js';
import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas.js';
import getStudentEnrollmentFromCanvas from './getStudentEnrollmentFromCanvas.js';
import getActiveSections from './getActiveSectionsFromCanvas.js';
import postToCanvas from './postToCanvas.js';
import toSisEnrollment from './toSisEnrollmentFromCanvasEnrollment.js';
import toSisSections from './toSisSectionsFromCanvasSections.js';
import toSisUsers from './toSisUsersFromCanvasUsers.js';

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

import getUsersFromCanvas from './getUsersFromCanvas';
import getCoursesFromCanvas from './getCoursesFromCanvas';
import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas';
import getStudentEnrollmentFromCanvas from './getStudentEnrollmentFromCanvas';
import getActiveSections from './getActiveSectionsFromCanvas';
import postToCanvas from './postToCanvas';

export default {
  getUsers: getUsersFromCanvas,
  getCourses: getCoursesFromCanvas,
  getActiveCourses: getActiveCoursesFromCanvas,
  getActiveSections,
  getStudentEnrollment: getStudentEnrollmentFromCanvas,
  post: postToCanvas,
};

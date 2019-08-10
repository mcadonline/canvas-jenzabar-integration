import getUsersFromCanvas from './getUsersFromCanvas';
import getCoursesFromCanvas from './getCoursesFromCanvas';
import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas';
import getStudentEnrollmentFromCanvas from './getStudentEnrollmentFromCanvas';
import postToCanvas from './postToCanvas';

export default {
  getUsers: getUsersFromCanvas,
  getCourses: getCoursesFromCanvas,
  getActiveCourses: getActiveCoursesFromCanvas,
  getStudentEnrollment: getStudentEnrollmentFromCanvas,
  post: postToCanvas,
};

import getUsersFromCanvas from './getUsersFromCanvas';
import getCoursesFromCanvas from './getCoursesFromCanvas';
import getStudentEnrollmentFromCanvas from './getStudentEnrollmentFromCanvas';
import postToCanvas from './postToCanvas';

export default {
  getUsers: getUsersFromCanvas,
  getCourses: getCoursesFromCanvas,
  getStudentEnrollment: getStudentEnrollmentFromCanvas,
  post: postToCanvas,
};

import { uniq } from 'ramda';
import jex from '../services/jex/index.js';

const convertToUser = ({ id, firstName, preferredName, lastName, username }) => ({
  id,
  firstName,
  preferredName,
  lastName,
  username,
});

const isInOnlineWorkshop = ({ courseCode }) => /^OL\s+0\d{3} \w+/.test(courseCode);
const hasValidUsername = ({ username }) => !!username;
const isInOlTeachingCertCourse = ({ courseCode }) => /^CSLA 605[1-3] \w+/.test(courseCode);
const enrolleeShouldHaveRepository = (enrollment) =>
  hasValidUsername(enrollment) &&
  (isInOlTeachingCertCourse(enrollment) || isInOnlineWorkshop(enrollment));

const getStudentsNeedingRepositories = async () => {
  // get all students enrolled in current and upcoming courses
  // then identify only those students enrolled in a workshop like
  // OL-0xxx.
  const allStudentEnrollment = await jex.getStudentEnrollment();
  return allStudentEnrollment.filter(enrolleeShouldHaveRepository).map(convertToUser);
};

const getInstructorUsers = async () => {
  const instructors = await jex.getInstructors();
  return instructors.filter((instructor) => !!instructor.username).map(convertToUser);
};

/**
 * gets a list of all instructors (of current and future courses)
 * and all enrollees in online learning workshops like OL-0xxx
 */
export default async () => {
  const [onlineWorkshopAttendeeUsers, instructorUsers] = await Promise.all([
    getStudentsNeedingRepositories(),
    getInstructorUsers(),
  ]);

  // deduplicate usernames.
  // Instructors may be workshop attendees and vice versa.
  return uniq([...onlineWorkshopAttendeeUsers, ...instructorUsers]);
};

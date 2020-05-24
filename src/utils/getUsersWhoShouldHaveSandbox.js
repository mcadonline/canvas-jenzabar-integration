import { uniq } from 'ramda';
import jex from '../services/jex';

const convertToUser = ({ id, firstName, preferredName, lastName, username }) => ({
  id,
  firstName,
  preferredName,
  lastName,
  username,
});

const getOnlineWorkshopAttendeeUsers = async () => {
  // get all students enrolled in current and upcoming courses
  // then identify only those students enrolled in a workshop like
  // OL-0xxx.
  const allStudentEnrollment = await jex.getStudentEnrollment();
  const olWorkshopCourseCodeRegEx = /^OL\s+0\d{3} \w+/;
  const workshopAttendeesWithUsername = allStudentEnrollment.filter(
    ({ courseCode, username }) => olWorkshopCourseCodeRegEx.test(courseCode) && !!username
  );
  return workshopAttendeesWithUsername.map(convertToUser);
};

const getInstructorUsers = async () => {
  const instructors = await jex.getInstructors();
  return instructors.filter(instructor => !!instructor.username).map(convertToUser);
};

/**
 * gets a list of all instructors (of current and future courses)
 * and all enrollees in online learning workshops like OL-0xxx
 */
export default async () => {
  const [onlineWorkshopAttendeeUsers, instructorUsers] = await Promise.all([
    getOnlineWorkshopAttendeeUsers(),
    getInstructorUsers(),
  ]);

  // deduplicate usernames.
  // Instructors may be workshop attendees and vice versa.
  return uniq([...onlineWorkshopAttendeeUsers, ...instructorUsers]);
};

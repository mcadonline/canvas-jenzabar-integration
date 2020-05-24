/* eslint-disable camelcase */
import { uniq, differenceWith } from 'ramda';
import jsonToCSV from '../utils/jsonToCSV';
import jex from '../services/jex';
import canvas from '../services/canvas';

const convertToUser = ({ firstName, preferredName, lastName, username }) => ({
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
const getUsersWhoShouldHaveSandbox = async () => {
  const [onlineWorkshopAttendeeUsers, instructorUsers] = await Promise.all([
    getOnlineWorkshopAttendeeUsers(),
    getInstructorUsers(),
  ]);

  // deduplicate usernames.
  // Instructors may be workshop attendees and vice versa.
  return uniq([...onlineWorkshopAttendeeUsers, ...instructorUsers]);
};

const getUsernamesWhoAlreadyHaveSandbox = async () => {
  const coursesInCanvas = await canvas.getCourses();
  return coursesInCanvas
    .filter(({ sis_course_id }) => /^SANDBOX-.+/.test(sis_course_id))
    .map(({ sis_course_id }) => {
      const found = sis_course_id.match(/^SANDBOX-(?<username>.+)/);
      return found.groups.username.toLowerCase();
    });
};

/**
 * @param today - pretend like this is today's date
 */
export default async () => {
  // get a list of all usernames of the peeps
  // who need a sandbox in Canvas
  const [shouldHaveSandboxUsers, alreadyHasSandboxUsernames] = await Promise.all([
    getUsersWhoShouldHaveSandbox(),
    getUsernamesWhoAlreadyHaveSandbox(),
  ]);

  const userHasUsernameInList = (user, username) => user.username === username;

  // who doesn't have a sandbox that needs one?
  const usersNeedingNewSandbox = differenceWith(
    userHasUsernameInList,
    shouldHaveSandboxUsers,
    alreadyHasSandboxUsernames
  );

  // only parent courses should have a course shell
  const canvasCsvCourses = usersNeedingNewSandbox.map(
    ({ firstName, preferredName, lastName, username }) => ({
      course_id: `SANDBOX-${username}`.toUpperCase(),
      short_name: `SANDBOX-${username}`.toUpperCase(),
      long_name: `SANDBOX: ${preferredName || firstName} ${lastName}`,
      status: 'active',
      blueprint_course_id: 'TEMPLATE-ENHANCEDCOURSE',
    })
  );

  const csv = jsonToCSV(canvasCsvCourses);
  return csv;
};

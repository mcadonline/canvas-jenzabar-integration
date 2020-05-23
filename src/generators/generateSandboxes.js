/* eslint-disable camelcase */
import { uniq, difference } from 'ramda';
import jsonToCSV from '../utils/jsonToCSV';
import jex from '../services/jex';
import canvas from '../services/canvas';

const getOnlineWorkshopAttendeeUsernames = async () => {
  // get all students enrolled in current and upcoming courses
  // then identify only those students enrolled in a workshop like
  // OL-0xxx.
  const allStudentEnrollment = await jex.getStudentEnrollment();
  const olWorkshopCourseCodeRegEx = /^OL\s+0\d{3} \w+/;
  const workshopAttendeesWithUsername = allStudentEnrollment.filter(
    ({ courseCode, username }) => olWorkshopCourseCodeRegEx.test(courseCode) && !!username
  );
  return workshopAttendeesWithUsername.map(attendee => attendee.username);
};

const getInstructorUsernames = async () => {
  const instructors = await jex.getInstructors();
  return instructors
    .filter(instructor => !!instructor.username)
    .map(instructor => instructor.username);
};

/**
 * gets a list of all instructors (of current and future courses)
 * and all enrollees in online learning workshops like OL-0xxx
 */
const getUsernamesWhoShouldHaveSandbox = async () => {
  const [onlineWorkshopAttendeeUsernames, instructorUsernames] = await Promise.all([
    getOnlineWorkshopAttendeeUsernames(),
    getInstructorUsernames(),
  ]);

  // deduplicate usernames.
  // Instructors may be workshop attendees and vice versa.
  return uniq([...onlineWorkshopAttendeeUsernames, ...instructorUsernames]);
};

const getUsernamesWhoAlreadyHasSandbox = async () => {
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
  const [shouldHaveSandboxUsernames, alreadyHasSandboxUsernames] = await Promise.all([
    getUsernamesWhoShouldHaveSandbox(),
    getUsernamesWhoAlreadyHasSandbox(),
  ]);

  // who doesn't have a sandbox that needs one?
  const needsNewSandboxUsernames = difference(
    shouldHaveSandboxUsernames,
    alreadyHasSandboxUsernames
  );

  // only parent courses should have a course shell
  const canvasCsvCourses = needsNewSandboxUsernames.map(username => ({
    course_id: `SANDBOX-${username}`.toUpperCase(),
    short_name: `SANDBOX-${username}`.toUpperCase(),
    long_name: `SANDBOX: ${username.toUpperCase()}`,
    status: 'active',
    blueprint_course_id: 'TEMPLATE-ENHANCEDCOURSE',
  }));

  const csv = jsonToCSV(canvasCsvCourses);
  return csv;
};

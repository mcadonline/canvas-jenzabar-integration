/* eslint-disable camelcase */
import { differenceWith } from 'ramda';
import jsonToCSV from '../utils/jsonToCSV';
import canvas from '../services/canvas';
import getUsersWhoShouldHaveSandbox from '../utils/getUsersWhoShouldHaveSandbox';

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

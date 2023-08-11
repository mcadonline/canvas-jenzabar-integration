/* eslint-disable camelcase */
import { differenceWith } from 'ramda';
import jsonToCSV from '../utils/jsonToCSV.js';
import canvas from '../services/canvas/index.js';
import getUsersWhoShouldHaveRepository from '../utils/getUsersWhoShouldHaveRepository.js';

const getUsernamesWhoAlreadyHaveRepository = async () => {
  const coursesInCanvas = await canvas.getCourses();
  return coursesInCanvas
    .filter(({ sis_course_id }) => /^REPOSITORY-.+/.test(sis_course_id))
    .map(({ sis_course_id }) => {
      const found = sis_course_id.match(/^REPOSITORY-(?<username>.+)/);
      return found.groups.username.toLowerCase();
    });
};

export default async () => {
  // get a list of all usernames of the peeps
  // who need a sandbox in Canvas
  const [shouldHaveRepositoryUsers, alreadyHasRepositoryUsernames] = await Promise.all([
    getUsersWhoShouldHaveRepository(),
    getUsernamesWhoAlreadyHaveRepository(),
  ]);

  const userHasUsernameInList = (user, username) => user.username === username;

  // who doesn't have a sandbox that needs one?
  const usersNeedingNewRepository = differenceWith(
    userHasUsernameInList,
    shouldHaveRepositoryUsers,
    alreadyHasRepositoryUsernames
  );

  // only parent courses should have a course shell
  const canvasCsvCourses = usersNeedingNewRepository.map(
    ({ firstName, preferredName, lastName, username }) => ({
      course_id: `REPOSITORY-${username}`.toUpperCase(),
      short_name: `REPOSITORY-${username}`.toUpperCase(),
      long_name: `REPOSITORY: ${preferredName || firstName} ${lastName}`,
      status: 'active',
      blueprint_course_id: 'TEMPLATE-REPOSITORYCOURSE',
    })
  );

  const csv = jsonToCSV(canvasCsvCourses);
  return csv;
};

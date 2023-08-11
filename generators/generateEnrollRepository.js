import getUsersWhoShouldHaveRepository from '../utils/getUsersWhoShouldHaveRepository.js';
import jsonToCSV from '../utils/jsonToCSV.js';

const userToCanvasEnrollmentCsvFormat = (user) => ({
  course_id: `REPOSITORY-${user.username.toUpperCase()}`,
  user_id: user.id,
  role: 'teacher',
  status: 'active',
});

export default async () => {
  const usersWhoShouldHaveSandbox = await getUsersWhoShouldHaveRepository();

  // assuming all users need to be enrolled.
  // Assuming all sandbox courses exist with sis course id: SANDBOX-USERNAME
  const canvasCsvEnrollments = usersWhoShouldHaveSandbox.map(userToCanvasEnrollmentCsvFormat);

  return jsonToCSV(canvasCsvEnrollments);
};

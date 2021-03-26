import getUsersWhoShouldHaveSandbox from '../utils/getUsersWhoShouldHaveSandbox.js';
import jsonToCSV from '../utils/jsonToCSV.js';

const userToCanvasEnrollmentCsvFormat = (user) => ({
  course_id: `SANDBOX-${user.username.toUpperCase()}`,
  user_id: user.id,
  role: 'teacher',
  status: 'active',
});

export default async () => {
  const usersWhoShouldHaveSandbox = await getUsersWhoShouldHaveSandbox();

  // assuming all users need to be enrolled.
  // Assuming all sandbox courses exist with sis course id: SANDBOX-USERNAME
  const canvasCsvEnrollments = usersWhoShouldHaveSandbox.map(userToCanvasEnrollmentCsvFormat);

  return jsonToCSV(canvasCsvEnrollments);
};

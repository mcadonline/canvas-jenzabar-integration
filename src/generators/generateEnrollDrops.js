import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';
import settings from '../settings';

export default async ({ jex, canvas, ignoreUsers = settings.ignoreUsers }) => {
  const [currentJexStudentEnrollments, currentCanvasStudentEnrollments] = await Promise.all([
    jex.getStudentEnrollment(),
    canvas.getStudentEnrollment(),
  ]);

  // some special users may need to be ignored
  // since they're not on the official roster
  // this is an escape hatch
  const ignoreSpecialUsersFromSettings = enrollee => !ignoreUsers.some(u => u === enrollee.user_id);

  const newCanvasEnrollments = setMinus(
    currentCanvasStudentEnrollments,
    currentJexStudentEnrollments,
  )
    .filter(ignoreSpecialUsersFromSettings)
    .map(enrollee => ({ ...enrollee, status: 'inactive', role: 'student' }));

  return jsonToCSV(newCanvasEnrollments);
};

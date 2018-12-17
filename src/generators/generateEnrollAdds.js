import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';

export default async ({ jex, canvas }) => {
  const [currentJexStudentEnrollments, currentCanvasStudentEnrollments] = await Promise.all([
    jex.getStudentEnrollment(),
    canvas.getStudentEnrollment(),
  ]);

  const newCanvasEnrollments = setMinus(
    currentJexStudentEnrollments,
    currentCanvasStudentEnrollments,
  ).map(enrollee => ({ ...enrollee, status: 'active', role: 'student' }));

  return jsonToCSV(newCanvasEnrollments);
};

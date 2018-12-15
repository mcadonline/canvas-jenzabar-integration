import { pipe } from 'ramda';
import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';

export default async ({ jex, canvas }) => {
  const [currentJexEnrollments, currentCanvasEnrollments] = await Promise.all([
    jex.getEnrollment(),
    canvas.getEnrollment(),
  ]);

  const withActiveStatus = enrollee => ({ ...enrollee, status: 'active' });

  const withStudentRole = enrollee => ({ ...enrollee, role: 'student' });

  const newCanvasEnrollments = setMinus(currentJexEnrollments, currentCanvasEnrollments).map(
    pipe(
      withActiveStatus,
      withStudentRole,
    ),
  );

  return jsonToCSV(newCanvasEnrollments);
};

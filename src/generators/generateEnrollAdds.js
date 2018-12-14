import setMinus from '../utils/setMinus';
import jsonToCSV from '../utils/jsonToCSV';

export default async ({ jex, canvas }) => {
  const [currentJexEnrollments, currentCanvasEnrollments] = await Promise.all([
    jex.getEnrollment(),
    canvas.getEnrollment(),
  ]);

  const withActiveStatus = enrollee => ({ ...enrollee, status: 'active' });

  const newCanvasEnrollments = setMinus(currentJexEnrollments, currentCanvasEnrollments).map(
    withActiveStatus,
  );

  return jsonToCSV(newCanvasEnrollments);
};

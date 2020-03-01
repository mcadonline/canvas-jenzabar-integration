import generateCourses from './generateCourses';
import isValidCSV from '../utils/isValidCSV';

describe('generateCourses', () => {
  it('generates valid CSV', async () => {
    const csv = await generateCourses();
    expect(isValidCSV(csv)).toBe(true);
  });
  it.skip('matches CanvasCSV format', async () => {
    const csv = await generateCourses();
    const firstLine = csv.split('\n')[0];
    const expectedHeaders = [
      'course_id',
      'short_name',
      'long_name',
      'term_id',
      'status',
      'start_date',
      'end_date',
      'course_format',
      'blueprint_course_id',
    ];
    const expectedFirstLine = `"${expectedHeaders.join('","')}"`;
    expect(firstLine).toBe(expectedFirstLine);
  });
});

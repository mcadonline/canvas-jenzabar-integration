import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';
import jex from './jexService';

describe('getEnrollmentFromJex', () => {
  afterEach(() => {
    jex.close();
  });
  it('gets data', async () => {
    const enrollments = await getStudentEnrollmentFromJex();
    expect(Object.keys(enrollments[0])).toMatchInlineSnapshot(`
      Array [
        "id",
        "firstName",
        "preferredName",
        "lastName",
        "mcadEmail",
        "username",
        "courseCode",
        "parentCourseCode",
        "term",
        "year",
      ]
    `);
  });
});

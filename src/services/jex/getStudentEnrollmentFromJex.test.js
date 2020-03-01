import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';

describe('getEnrollmentFromJex', () => {
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

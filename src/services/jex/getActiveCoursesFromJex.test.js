import getActiveCoursesFromJex from './getActiveCoursesFromJex';

describe('getActiveCoursesFromJex', () => {
  it('get courses from jex', async () => {
    const courses = await getActiveCoursesFromJex();
    expect(Object.keys(courses[0])).toMatchInlineSnapshot(`
      Array [
        "year",
        "term",
        "courseCode",
        "title",
        "startDate",
        "endDate",
        "courseFormat",
        "parentCourseCode",
        "instructorId",
        "instructorFirstName",
        "instructorPrefName",
        "instructorLastName",
      ]
    `);
  });
});

/**
 * This is an integration test of all of our jex methods. It hits a real
 *  database, so it will be slow.
 */

import jex from './index';

describe('jex integration tests', () => {
  describe('jex.getActiveCourses', () => {
    it('gets current and future sections', async () => {
      const sections = await jex.getActiveCourses();
      const first = sections[0];
      expect(sections.length).toBeGreaterThan(10);
      expect(Object.keys(first)).toMatchInlineSnapshot(`
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

  describe('jex.getStudentEnrollment', () => {
    it('gets enrollment for current and future sections', async () => {
      const enrollment = await jex.getStudentEnrollment();
      const first = enrollment[0];
      expect(enrollment.length).toBeGreaterThan(100);
      expect(Object.keys(first)).toMatchInlineSnapshot(`
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
});

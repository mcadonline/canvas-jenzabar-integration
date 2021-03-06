/**
 * This is an integration test of all of our jex methods. It hits a real
 *  database, so it will be slow.
 */

import jex from './index';

describe('jex integration tests', () => {
  afterAll(() => jex.close());
  describe('jex.getActiveCourses', () => {
    it('gets current and future sections', async () => {
      const sections = await jex.getActiveCourses();
      const first = sections[0];
      expect(sections.length).toBeGreaterThan(10);
      expect(Object.keys(first)).toMatchInlineSnapshot(`
                        Array [
                          "id",
                          "name",
                          "courseCode",
                          "parentCourseCode",
                          "term",
                          "year",
                          "startDate",
                          "endDate",
                          "openDate",
                          "closeDate",
                          "courseFormat",
                          "instructor",
                        ]
                  `);
    });
  });

  describe('jex.getStudentEnrollment', () => {
    afterAll(() => jex.close());

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

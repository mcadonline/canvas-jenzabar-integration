import { describe, expect } from '@jest/globals';
import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';
import jexService from './jexService';
import jex from './jexService';
import { jest } from '@jest/globals';

const mockData = [
  {
    id: 2,
    firstName: 'George',
    preferredName: null,
    lastName: 'Costanza',
    personalEmail: 'art@vandelayindustries.com',
    mcadEmail: null,
    username: null,
  },
];

describe('getEnrollmentFromJex', () => {
  describe('unit', () => {
    beforeEach(function () {
      jest.spyOn(jexService, 'query');
      jexService.query.mockResolvedValue(mockData);
    })

    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('get filtered courses', async () => {
      const courses = await getStudentEnrollmentFromJex();
      expect(jexService.query).toBeCalled;
      expect(courses.length).toBe(1);
    });
  });

  describe('integration', () => {
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
  })
});

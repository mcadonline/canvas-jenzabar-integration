import getActiveCoursesFromJex from './getActiveCoursesFromJex.js';
import { beforeEach, jest } from '@jest/globals';
import Course from '../../models/Course/index.js';
import jex from './jexService.js';
import threeWeeksLater from '../../models/Course/threeWeeksLater.js';
import endOfDay from '../../models/Course/endOfDay.js';
import jexService from './jexService';

const mockData = [
  {
    id: 1,
    year: 2022,
    term: 'FA',
    title: 'trial',
    startDate: '2020-08-24',
    endDate: '2020-12-11',
    courseFormat: 'online',
    instructorId: 10,
    instructorFirstName: 'Elaine',
    instructorPrefName: 'Laney',
    instructorLastName: 'benes',
    personalEmail: 'elaine.benes@jpederman.com',
    mcadEmail: 'ebenes@mcad.edu',
    username: 'ebenes',
    courseCode: 'FDN  1111 07',
    parentCourseCode: 'FDN  1111 07'
  },
  // the following one is not a valid course so will not be filtered
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

describe('getActiveCoursesFromJex', () => {
  describe('unit', () => {
    beforeEach(function () {
      jest.spyOn(jexService, 'query');
      jexService.query.mockResolvedValue(mockData);
    })

    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('get filtered courses', async () => {
      const courses = await getActiveCoursesFromJex();
      expect(jexService.query).toBeCalled;
      expect(courses).toMatchInlineSnapshot(`
      Array [
        Object {
          "closeDate": "2021-01-01T23:59:59.000-05:00",
          "courseCode": "FDN  1111 07",
          "courseFormat": "online",
          "endDate": "2020-12-11",
          "id": "FDN-1111-07-F22",
          "instructor": Object {
            "firstName": "Laney",
            "id": 10,
            "lastName": "benes",
          },
          "name": "trial -- L. benes (Sect. 07 - Fall 2022)",
          "openDate": "2020-08-23T00:00:00.000-04:00",
          "parentCourseCode": "FDN  1111 07",
          "startDate": "2020-08-24",
          "term": "FA",
          "year": 2022,
        },
      ]
    `);
    })
  })

  describe('integration', () => {
    afterEach(() => {
      jex.close();
    });
  
    it('get courses from jex', async () => {
      const courses = await getActiveCoursesFromJex();
      expect(Course.isCourse(courses[0])).toBe(true);
    });
  
    it('closeDate is 3 weeks after endDate', async () => {
      const courses = await getActiveCoursesFromJex();
      courses.forEach((course) => {
        expect(course.endDate).toBeTruthy();
        expect(course.closeDate).toBeTruthy();
        expect(course.closeDate).toEqual(threeWeeksLater(endOfDay(course.endDate)));
      });
    });
  });
});

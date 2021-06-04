import getActiveCoursesFromJex from './getActiveCoursesFromJex.js';
import Course from '../../models/Course/index.js';
import jex from './jexService.js';
import threeWeeksLater from '../../models/Course/threeWeeksLater.js';
import endOfDay from '../../models/Course/endOfDay.js';

describe('getActiveCoursesFromJex', () => {
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

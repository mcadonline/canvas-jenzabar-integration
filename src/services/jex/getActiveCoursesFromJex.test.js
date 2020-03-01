import getActiveCoursesFromJex from './getActiveCoursesFromJex';
import Course from '../../models/Course';

describe('getActiveCoursesFromJex', () => {
  it('get courses from jex', async () => {
    const courses = await getActiveCoursesFromJex();
    expect(Course.isCourse(courses[0])).toBe(true);
  });
});

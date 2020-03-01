import getActiveCoursesFromJex from './getActiveCoursesFromJex';
import Course from '../../models/Course';

describe('getActiveCoursesFromJex', () => {
  it('get courses from jex', async () => {
    const courses = await getActiveCoursesFromJex();
    const first10 = courses.slice(0, 10);
    console.log(first10);
    expect(Course.isCourse(courses[0])).toBe(true);
  });
});

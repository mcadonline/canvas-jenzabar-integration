import getActiveCoursesFromJex from './getActiveCoursesFromJex';
import Course from '../../models/Course';
import jex from './jexService';

describe('getActiveCoursesFromJex', () => {
  afterEach(() => {
    jex.close();
  });

  it('get courses from jex', async () => {
    const courses = await getActiveCoursesFromJex();
    expect(Course.isCourse(courses[0])).toBe(true);
  });
});

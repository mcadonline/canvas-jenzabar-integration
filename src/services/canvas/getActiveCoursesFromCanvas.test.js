import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas';
import getCoursesFromCanvas from './getCoursesFromCanvas';

jest.mock('./getCoursesFromCanvas');

describe('getActiveCoursesFromCanvas', () => {
  it('correctly gets mock courses', async () => {
    const courses = await getCoursesFromCanvas();
    expect(courses.length).toEqual(5);
  });

  it('gets courses with end date of today or later', async () => {
    const activeCourses = await getActiveCoursesFromCanvas();
    expect(activeCourses.length).toBe(3);
    // expect courses 2, 3, and 4 to be on the course list
    expect(activeCourses.map(c => c.id)).toEqual([2, 3, 4]);
  });
  it('ignores courses without SIS ID set', async () => {
    const activeCourses = await getActiveCoursesFromCanvas();
    const activeCoursesWithNoSIS = activeCourses.filter(c => !c.course_id);
    expect(activeCoursesWithNoSIS).toEqual([]);
  });
  it('includes courses without an end date set', async () => {
    const activeCourses = await getActiveCoursesFromCanvas();
    const coursesWithNoEndDate = activeCourses.filter(c => c.end_date === null);
    expect(coursesWithNoEndDate.length).toBe(1);
  });
});

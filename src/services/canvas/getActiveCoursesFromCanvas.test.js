import { DateTime } from 'luxon';
import getCoursesFromCanvas from './getCoursesFromCanvas';
import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas';

const completedCourse = {
  id: 1,
  name: 'Completed Course',
  start_date: '2019-01-20T06:00:00Z',
  end_date: '2019-05-31T05:00:00Z',
  sis_course_id: 'SIS-COMPLETED-W19',
};

const currentCourse = {
  id: 2,
  name: 'Open Currently Course',
  start_date: DateTime.utc()
    .plus({ months: -2 })
    .toString(),
  end_date: DateTime.utc()
    .plus({ months: 2 })
    .toString(),
  sis_course_id: 'SIS-OPEN-F20',
};

const upcomingCourse = {
  id: 3,
  name: 'Upcoming Course',
  start_date: DateTime.utc()
    .plus({ months: 4 })
    .toString(),
  end_date: DateTime.utc()
    .plus({ months: 8 })
    .toString(),
  sis_course_id: 'SIS-UPCOMING-F99',
};

const openIndefinitelyCourse = {
  id: 4,
  name: 'Open Indefinitely',
  start_date: null,
  end_date: null,
  sis_course_id: 'SIS-INDEFINITE-F99',
};

const noSISIdCourse = {
  id: 5,
  name: 'No SIS ID',
  start_date: null,
  end_date: null,
  sis_course_id: null,
};

jest.mock('./getCoursesFromCanvas', () => jest.fn());

describe('getActiveCoursesFromCanvas', () => {
  it('correctly gets mock courses', async () => {
    getCoursesFromCanvas.mockResolvedValue([completedCourse]);
    const courses = await getCoursesFromCanvas();
    expect(courses[0]).toEqual(completedCourse);
  });

  it('ignores courses that have ended', async () => {
    getCoursesFromCanvas.mockResolvedValue([currentCourse, completedCourse]);

    const activeCourses = await getActiveCoursesFromCanvas();
    expect(activeCourses).toEqual([currentCourse]);
  });

  it('ignores courses without SIS ID set', async () => {
    getCoursesFromCanvas.mockResolvedValue([currentCourse, noSISIdCourse]);
    const activeCourses = await getActiveCoursesFromCanvas();
    expect(activeCourses).toEqual([currentCourse]);
  });
  it('includes courses without an end date set', async () => {
    getCoursesFromCanvas.mockResolvedValue([currentCourse, openIndefinitelyCourse]);
    const activeCourses = await getActiveCoursesFromCanvas();
    expect(activeCourses).toEqual([currentCourse, openIndefinitelyCourse]);
  });
  it('includes future courses', async () => {
    getCoursesFromCanvas.mockResolvedValue([currentCourse, upcomingCourse]);
    const activeCourses = await getActiveCoursesFromCanvas();
    expect(activeCourses).toEqual([currentCourse, upcomingCourse]);
  });
});

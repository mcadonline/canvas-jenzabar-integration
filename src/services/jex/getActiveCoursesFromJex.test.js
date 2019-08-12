import getActiveCoursesFromJex from './getActiveCoursesFromJex';

const mockCourses = [
  {
    courseCode: 'GWD   6610 20',
    term: 'FA',
    year: 2019,
    parentCourseCode: 'GWD   6610 20',
  },
  {
    courseCode: 'AH   3862 01',
    term: 'FA',
    year: 2019,
    parentCourseCode: 'AH   3862 01',
  },
  {
    courseCode: 'HS   3862 01',
    term: 'FA',
    year: 2019,
    parentCourseCode: 'AH   3862 01',
  },
];

const jexService = {
  query: jest.fn().mockResolvedValue(mockCourses),
};

describe('getActiveCoursesFromJex', () => {
  it('returns a function given a jexService', () => {
    const getActiveCourses = getActiveCoursesFromJex(jexService);
    expect(typeof getActiveCourses).toBe('function');
  });

  it('gets a list of current and upcoming courses from jex', async () => {
    const getActiveCourses = getActiveCoursesFromJex(jexService);
    const courses = await getActiveCourses();
    expect(courses).toEqual(mockCourses);
  });
});

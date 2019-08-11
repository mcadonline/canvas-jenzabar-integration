import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';

describe('getEnrollmentFromJex', () => {
  it('returns a function given a jexService', () => {
    const fn = getStudentEnrollmentFromJex(jest.fn());
    expect(typeof fn).toBe('function');
  });
  it('gets enrollment for active courses from Jex', async () => {
    const jexService = {
      query: jest.fn().mockResolvedValue([
        {
          id: '1',
          username: 'user1',
          courseCode: 'GWD  6610 20',
          term: 'FA',
          year: '2018',
        },
        {
          id: '1',
          username: 'user1',
          courseCode: 'AH 1000 01',
          term: 'FA',
          year: '2018',
        },
        {
          id: '2',
          courseCode: 'AH  1000 20',
          term: 'SP',
          year: '2019',
        },
      ]),
    };

    const getStudentEnrollment = getStudentEnrollmentFromJex(jexService);
    const enrollments = await getStudentEnrollment();
    expect(enrollments).toEqual([
      {
        user_id: 1,
        course_id: 'GWD-6610-20-F18',
      },
      {
        user_id: 1,
        course_id: 'AH-1000-01-F18',
      },
      {
        user_id: 2,
        course_id: 'AH-1000-20-W19',
      },
    ]);
  });
});

import getSectionsFromJex from './getSectionsFromJex';

const jexService = {
  query: jest.fn(),
};

describe('getSectionsFromJex', () => {
  it('gets a list of sections given parent courses', async () => {
    jexService.query.mockResolvedValue([
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
    ]);

    const activeCanvasCourses = ['GWD-6610-20-F19', 'AH-3862-01-F19'];

    const sections = await getSectionsFromJex(jexService)(activeCanvasCourses);
    expect(sections).toEqual([
      {
        courseId: 'GWD-6610-20-F19',
        parentCourseId: 'GWD-6610-20-F19',
      },
      {
        courseId: 'AH-3862-01-F19',
        parentCourseId: 'AH-3862-01-F19',
      },
      {
        courseId: 'HS-3862-01-F19',
        parentCourseId: 'AH-3862-01-F19',
      },
    ]);
  });
});

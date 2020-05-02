import generateEnrollFaculty from './generateEnrollFaculty';
import jex from '../services/jex';

describe('generateEnrollFaculty', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it.only('gets a list of new enrollments to add to Canvas', async () => {
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: '2D-3303-20-F20',
        name: 'Drawing Through a Lens -- A. Sands (Sect. 20 - Fall 2020)',
        courseCode: '2D   3303 20',
        parentCourseCode: '2D   3303 20',
        term: 'FA',
        year: 2020,
        startDate: '2020-08-24',
        endDate: '2020-12-11',
        openDate: '2020-08-23',
        closeDate: '2020-12-31T23:59:59.000-06:00',
        courseFormat: 'online',
        instructor: { id: 1175109, firstName: 'Amy', lastName: 'Sands' },
      },
    ]);

    const enrollFacultyCsv = await generateEnrollFaculty();

    expect(enrollFacultyCsv).toMatchInlineSnapshot(`
      "\\"course_id\\",\\"user_id\\",\\"role\\",\\"status\\"
      \\"2D-3303-20-F20\\",\\"1175109\\",\\"teacher\\",\\"active\\""
    `);
  });
});

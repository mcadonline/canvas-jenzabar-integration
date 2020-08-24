import jex from '../services/jex';
import canvas from '../services/canvas';
import generateCourseUpdates from './generateCourseUpdates';

describe('generateCourseUpdates', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('lists courses with names that need updating', async () => {
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        name: 'Correct Name',
        courseCode: 'FDN  1111 07',
        parentCourseCode: 'FDN  1111 07',
        term: 'FA',
        year: 2020,
        startDate: '2020-01-02',
        endDate: '2020-12-11',
        openDate: '2020-01-01T00:00:00.000-06:00',
        closeDate: '2020-12-31T23:59:59.000-06:00',
        courseFormat: 'on_campus',
        instructor: { id: 114, firstName: 'George', lastName: 'Costanza' },
      },
    ]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        id: 2,
        name: 'Out of date name',
        start_date: '2020-01-01T00:00:00.000-06:00',
        end_date: '2020-12-31T23:59:59.000-06:00',
        course_code: 'FDN-1111-07-F20',
        sis_course_id: 'FDN-1111-07-F20',
        sis_import_id: null,
        workflow_state: 'available',
        course_format: 'on_campus',
      },
    ]);

    const csv = await generateCourseUpdates();
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status
      FDN-1111-07-F20,FDN-1111-07-F20,Correct Name,active"
    `);
  });
  it.todo('lists courses with open dates that need updating');
  it.todo('it lists courses with end dates that need updating');
});

import jex from '../services/jex';
import canvas from '../services/canvas';
import generateCourseUpdates from './generateCourseUpdates';

describe('generateCourseUpdates', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('update course publish state', () => {
    it('course open (jex) and unpublished (canvas) => update to publish', async () => {
      const now = '2020-01-01T00:00:00.000-06:00';

      // course is open according to jex
      jest.spyOn(jex, 'getActiveCourses');
      jex.getActiveCourses.mockResolvedValue([
        {
          id: 'FDN-1111-07-F20',
          name: 'Foundation: 2D -- G. Costanza (Sect. 07 - Fall 2020)',
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

      // course is unpublished in Canvas
      jest.spyOn(canvas, 'getCourses');
      canvas.getCourses.mockResolvedValue([
        {
          id: 2,
          name: 'Foundation: 2D -- G. Costanza (Sect. 07 - Fall 2020)',
          start_date: '2020-01-01T00:00:00.000-06:00',
          end_date: '2020-12-31T23:59:59.000-06:00',
          course_code: 'FDN-1111-07-F20',
          sis_course_id: 'FDN-1111-07-F20',
          sis_import_id: null,
          workflow_state: 'unpublished', // should be published
          course_format: 'on_campus',
        },
      ]);

      const csv = await generateCourseUpdates({ today: now });
      expect(csv).toMatchInlineSnapshot(`
        "course_id,short_name,long_name,status,start_date,end_date
        FDN-1111-07-F20,FDN-1111-07-F20,Foundation: 2D -- G. Costanza (Sect. 07 - Fall 2020),published,2020-01-01T00:00:00.000-06:00,2020-12-31T23:59:59.000-06:00"
      `);
    });

    it('course open (jex) and published (canvas) => no action taken', async () => {
      const now = '2020-01-01T00:00:00.000-06:00';

      // course is OPEN according to jex
      jest.spyOn(jex, 'getActiveCourses');
      jex.getActiveCourses.mockResolvedValue([
        {
          id: 'FDN-1111-07-F20',
          name: 'Foundation: 2D -- G. Costanza (Sect. 07 - Fall 2020)',
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

      // course is PUBLISHED in Canvas
      jest.spyOn(canvas, 'getCourses');
      canvas.getCourses.mockResolvedValue([
        {
          id: 2,
          name: 'Foundation: 2D -- G. Costanza (Sect. 07 - Fall 2020)',
          start_date: '2020-01-01T00:00:00.000-06:00',
          end_date: '2020-12-31T23:59:59.000-06:00',
          course_code: 'FDN-1111-07-F20',
          sis_course_id: 'FDN-1111-07-F20',
          sis_import_id: null,
          workflow_state: 'available',
          course_format: 'on_campus',
        },
      ]);

      const csv = await generateCourseUpdates({ today: now });
      expect(csv).toMatchInlineSnapshot(`""`);
    });
    // not 100% sure this is what we want
    // setting status to "unpublished" in CSV does not seem to unpublish
    // a course (even when override_sis_stickiness = true)
    it.todo(
      'dont attempt to update status when course is published in canvas but not officially open'
    );
    it.todo('after end date (jex) => no action taken');
    it.todo('open (jex) and does not exist on canvas => ignore');
  });

  it.todo('lists courses with names that need updating');
  it.todo('lists courses with open dates that need updating');
  it.todo('it lists courses with end dates that need updating');
});

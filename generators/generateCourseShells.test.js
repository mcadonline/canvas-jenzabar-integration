import { jest } from '@jest/globals';
import generateCourseShells from './generateCourseShells.js';
import jex from '../services/jex/index.js';
import canvas from '../services/canvas/index.js';

describe('generateCourses', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('only lists courses that need a course shell', async () => {
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      // already has course shell
      {
        id: 'FDN-1111-07-F20',
        name: 'Foundation: 2D -- G. Costanza (Sect. 07 - Fall 2020)',
        courseCode: 'FDN  1111 07',
        parentCourseCode: 'FDN  1111 07',
        term: 'FA',
        year: 2020,
        startDate: '2020-08-24',
        endDate: '2020-12-11',
        openDate: '2020-08-23T00:00:00.000-05:00',
        closeDate: '2021-01-01T23:59:59.000-06:00',
        courseFormat: 'on_campus',
        instructor: { id: 114, firstName: 'George', lastName: 'Costanza' },
      },
      // no course shell
      {
        id: 'AH-1000-01-F20',
        name: 'Art History -- C. Kramer (Sect. 01 - Fall 2020)',
        courseCode: 'AH   1000 01',
        parentCourseCode: 'AH   1000 01',
        term: 'FA',
        year: 2020,
        startDate: '2020-08-24',
        endDate: '2020-12-11',
        openDate: '2020-08-23T00:00:00.000-05:00',
        closeDate: '2021-01-01T23:59:59.000-06:00',
        courseFormat: 'on_campus',
      },
    ]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        id: 2,
        name: 'Foundation: 2D -- G. Costanza (Sect. 07 - Fall 2020)',
        start_date: '2020-08-23T00:00:00.000-05:00',
        end_date: '2020-12-31T23:59:59.000-06:00',
        course_code: 'FDN-1111-07-F20',
        sis_course_id: 'FDN-1111-07-F20',
        sis_import_id: null,
        workflow_state: 'unpublished',
        course_format: 'on_campus',
      },
    ]);

    const csv = await generateCourseShells({ currentDateTime: '2020-01-01' });
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,term_id,start_date,end_date,status,blueprint_course_id
      AH-1000-01-F20,AH-1000-01-F20,Art History -- C. Kramer (Sect. 01 - Fall 2020),2020-FA,,2021-01-01T23:59:59.000-06:00,active,TEMPLATE-ENHANCEDCOURSE"
    `);
  });
});

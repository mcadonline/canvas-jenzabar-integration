import { jest } from '@jest/globals';
import generateSectionsForActiveCourses from './generateSectionsForActiveCourses';
import canvas from '../services/canvas';
import jex from '../services/jex';

describe('generateSectionsForActiveCourses', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('creates section csv for x-listed courses', async () => {
    jest.spyOn(canvas, 'getActiveCourses');
    jest.spyOn(canvas, 'getActiveSections');
    jest.spyOn(jex, 'getActiveCourses');

    // assuming that AH-1000-20-F20 is an active course on
    // canvas.
    canvas.getActiveCourses.mockResolvedValue([
      {
        id: 2,
        name: 'Art History',
        start_date: 'whatever',
        end_date: 'whatever',
        sis_course_id: 'AH-1000-20-F20',
      },
    ]);

    // and AH-1000 is also a current or future
    // course in jex. With AH-1000 and HS-1000
    // cross-listed with the parent course being AH-1000
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'AH-1000-20-F20',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: 2020,
      },
      {
        id: 'HS-1000-20-F20',
        courseCode: 'HS   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: 2020,
      },
    ]);

    // this generator should try to create sections for
    // both AH-1000-20-F20 and HS-1000-20 in the
    // AH-1000-20-F20 course in Canvas.

    // That is, assuming that these sections don't already
    // exist in Canvas
    canvas.getActiveSections.mockResolvedValue([]);

    const csv = await generateSectionsForActiveCourses();
    expect(csv).toMatchInlineSnapshot(`
      "section_id,course_id,name,status
      AH-1000-20-F20,AH-1000-20-F20,AH-1000-20-F20,active
      HS-1000-20-F20,AH-1000-20-F20,HS-1000-20-F20,active"
    `);
  });

  it('ignores sections that are already created', async () => {
    jest.spyOn(canvas, 'getActiveCourses');
    jest.spyOn(canvas, 'getActiveSections');
    jest.spyOn(jex, 'getActiveCourses');

    // assuming that AH-1000-20-F20 is an active course on
    // canvas.
    canvas.getActiveCourses.mockResolvedValue([
      {
        id: 2,
        name: 'Art History',
        start_date: 'whatever',
        end_date: 'whatever',
        sis_course_id: 'AH-1000-20-F20',
      },
    ]);

    // and AH-1000 is also a current or future
    // course in jex. With AH-1000 and HS-1000
    // cross-listed with the parent course being AH-1000
    jex.getActiveCourses.mockResolvedValue([
      {
        courseCode: 'AH   1000 20',
        term: 'FA',
        year: 2020,
        parentCourseCode: 'AH   1000 20',
      },
      {
        courseCode: 'HS   1000 20',
        term: 'FA',
        year: 2020,
        parentCourseCode: 'AH   1000 20',
      },
    ]);

    // If the section 'AH-1000-20-F20 already exists in Canvas
    canvas.getActiveSections.mockResolvedValue([
      {
        id: 155,
        name: 'AH-1000-20-F20',
        sis_course_id: 'AH-1000-20-F20',
        sis_section_id: 'AH-1000-20-F20',
      },
    ]);

    // this generator should try to create sections for
    // ONLY HS-1000-20  in Canvas.
    const csv = await generateSectionsForActiveCourses();
    expect(csv).toMatchInlineSnapshot(`
      "section_id,course_id,name,status
      HS-1000-20-F20,AH-1000-20-F20,HS-1000-20-F20,active"
    `);
  });
});

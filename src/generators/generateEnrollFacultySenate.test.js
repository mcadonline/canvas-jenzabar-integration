import { jest } from '@jest/globals';
import generateEnrollFacultySenate from './generateEnrollFacultySenate';
import jex from '../services/jex';

describe('generateEnrollFacultySenate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('gets a list of all current and future faculty to add to faculty senate', async () => {
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
        instructor: { id: 123, firstName: 'Amy', lastName: 'Sands' },
      },
      {
        id: 'DEPT-1234-01-F20',
        name: 'Test Course -- S. Teacher',
        courseCode: 'DEPT 1234 01',
        parentCourseCode: 'DEPT 1234 01',
        term: 'FA',
        year: 2020,
        startDate: '2020-08-24',
        endDate: '2020-12-11',
        openDate: '2020-08-23',
        closeDate: '2020-12-31T23:59:59.000-06:00',
        courseFormat: 'online',
        instructor: { id: 456, firstName: 'Super', lastName: 'Teacher' },
      },
    ]);

    const enrollFacultySenateCsv = await generateEnrollFacultySenate({
      currentDateTime: '2020-08-22',
    });

    expect(enrollFacultySenateCsv).toMatchInlineSnapshot(`
      "section_id,user_id,role,status
      FACULTY-SENATE-RESOURCES,123,student,active
      FACULTY-SENATE-RESOURCES,456,student,active"
    `);
  });
});

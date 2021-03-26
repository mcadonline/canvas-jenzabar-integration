import { jest } from '@jest/globals';
import generateEnrollAdds from './generateEnrollAdds';
import canvas from '../services/canvas';
import jex from '../services/jex';

describe('generateEnrollAdds', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets a list of new enrollments to add to Canvas', async () => {
    jest.spyOn(canvas, 'getActiveSections');
    jest.spyOn(canvas, 'getStudentEnrollment');
    jest.spyOn(jex, 'getStudentEnrollment');

    canvas.getActiveSections.mockResolvedValue([
      {
        id: 155,
        name: 'GWD-6610-20-F18',
        sis_course_id: 'GWD-6610-20-F18',
        sis_section_id: 'GWD-6610-20-F18',
      },
    ]);

    canvas.getStudentEnrollment = jest.fn().mockResolvedValue([
      {
        sis_user_id: '1',
        sis_course_id: 'GWD-6610-20-F18',
        sis_section_id: 'GWD-6610-20-F18',
      },
    ]);

    jex.getStudentEnrollment = jest.fn().mockResolvedValue([
      {
        id: 1,
        username: 'user1',
        firstName: 'User',
        preferredName: null,
        lastName: 'One',
        mcadEmail: 'user1@mcad.edu',
        courseCode: 'GWD  6610 20',
        parentCourseCode: 'GWD  6610 20',
        term: 'FA',
        year: '2018',
      },
      {
        id: 2,
        username: 'newuser',
        firstName: 'New',
        preferredName: null,
        lastName: 'User',
        mcadEmail: 'newuser@mcad.edu',
        courseCode: 'GWD  6610 20',
        parentCourseCode: 'GWD  6610 20',
        term: 'FA',
        year: '2018',
      },
    ]);

    const enrollAddsCsv = await generateEnrollAdds();

    expect(enrollAddsCsv).toMatchInlineSnapshot(`
      "section_id,user_id,role,status
      GWD-6610-20-F18,2,student,active"
    `);
  });

  it('ignores section_id suffix, enrolling the same users in AH-1234-01-F20 and AH-1234-01-F20-1', async () => {
    // when deleting a course, it's possible it contains sections and
    // enrollments which use given sis_section_id which we'll want to use
    // elsewhere.
    // It's easy to forget to delete the sections and enrollments at the same
    // time. SO, instead we will allow any sis_section_id that begins with
    // a course id to be enrolled.
    // For example, sis_section_id AH-1234-01-F20 will have the same enrollment
    // as AH-1234-01-F20-1 and AH-1234-01-F20-2 and AH-1234-01-F20-WHATEVER

    // ARRANGE
    // two active sections in GWD-6610-20-F18
    jest.spyOn(canvas, 'getActiveSections');
    canvas.getActiveSections.mockResolvedValue([
      {
        id: 1,
        name: 'GWD-6610-20-F18',
        sis_course_id: 'GWD-6610-20-F18',
        sis_section_id: 'GWD-6610-20-F18',
      },
      {
        id: 2,
        name: 'GWD-6610-20-F18',
        sis_course_id: 'GWD-6610-20-F18',
        sis_section_id: 'GWD-6610-20-F18-WHATEVER',
      },
    ]);

    // no students enrolled yet
    jest.spyOn(canvas, 'getStudentEnrollment');
    canvas.getStudentEnrollment = jest.fn().mockResolvedValue([]);

    // one student in this section
    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment = jest.fn().mockResolvedValue([
      {
        id: 1,
        username: 'user1',
        firstName: 'User',
        preferredName: null,
        lastName: 'One',
        mcadEmail: 'user1@mcad.edu',
        courseCode: 'GWD  6610 20',
        parentCourseCode: 'GWD  6610 20',
        term: 'FA',
        year: '2018',
      },
    ]);

    // ACT
    const enrollAddsCsv = await generateEnrollAdds();

    // ASSERT
    expect(enrollAddsCsv).toMatchInlineSnapshot(`
      "section_id,user_id,role,status
      GWD-6610-20-F18,1,student,active
      GWD-6610-20-F18-WHATEVER,1,student,active"
    `);
  });
});

import generateEnrollDrops from './generateEnrollDrops';
import canvas from '../services/canvas';
import jex from '../services/jex';

describe('generateEnrollDrops', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('generates CSV of students to drop from sections in Canvas', async () => {
    jest.spyOn(canvas, 'getActiveSections');
    canvas.getActiveSections.mockResolvedValue([
      {
        id: 155,
        name: 'GWD-6610-20-F18',
        sis_course_id: 'GWD-6610-20-F18',
        sis_section_id: 'GWD-6610-20-F18',
      },
    ]);

    jest.spyOn(canvas, 'getStudentEnrollment');
    canvas.getStudentEnrollment.mockResolvedValue([
      {
        sis_user_id: '1',
        sis_course_id: 'GWD-6610-20-F18',
        sis_section_id: 'GWD-6610-20-F18',
      },
      {
        sis_user_id: '2',
        sis_course_id: 'GWD-6610-20-F18',
        sis_section_id: 'GWD-6610-20-F18',
      },
    ]);

    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment.mockResolvedValue([
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

    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'GWD-6610-20-F18',
      },
    ]);

    const csv = await generateEnrollDrops();

    expect(csv).toMatchInlineSnapshot(`
      "section_id,user_id,role,status
      GWD-6610-20-F18,2,student,deleted"
    `);
  });
  it('does not drop students after the jex end date', async () => {
    // jest.spyOn(canvas, 'getStudentEnrollment');

    // suppose that IDM-6611-20-W20 has ended already
    // according to the Jex endDate, but it but is still listed.
    // and suppose that AH-1702-05-W20 is still an active section
    // and has not yet ended according to Jex end Date
    jest.spyOn(canvas, 'getActiveSections');
    canvas.getActiveSections.mockResolvedValue([
      // technically:
      // GWD-6610-20-W20 section is still active (it's 15 weeks)
      // but IDM-6611-20-W20 section has ended (it's the first 5 weeks)
      {
        id: 208,
        name: 'IDM-6611-20-W20',
        course_id: 239,
        sis_course_id: 'GWD-6610-20-W20',
        sis_section_id: 'IDM-6611-20-W20',
      },
      {
        id: 248,
        name: 'AH-1702-05-W20',
        course_id: 242,
        sis_course_id: 'AH-1702-05-W20',
        sis_section_id: 'AH-1702-05-W20',
      },
    ]);

    jest.spyOn(canvas, 'getStudentEnrollment');
    canvas.getStudentEnrollment.mockResolvedValue([
      // students from course that has ended
      {
        sis_user_id: '111',
        sis_course_id: 'GWD-6610-20-W20',
        sis_section_id: 'IDM-6611-20-W20',
      },
      {
        sis_user_id: '222',
        sis_course_id: 'GWD-6610-20-W20',
        sis_section_id: 'IDM-6611-20-W20',
      },
      {
        sis_user_id: '333',
        sis_course_id: 'GWD-6610-20-W20',
        sis_section_id: 'IDM-6611-20-W20',
      },
      // student who will need to be dropped
      {
        sis_user_id: '444',
        sis_course_id: 'AH-1702-05-W20',
        sis_section_id: 'AH-1702-05-W20',
      },
      // active student
      {
        sis_user_id: '555',
        sis_course_id: 'AH-1702-05-W20',
        sis_section_id: 'AH-1702-05-W20',
      },
    ]);

    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment.mockResolvedValue([
      {
        id: 555,
        username: 'abc',
        courseCode: 'AH   1702 05',
        parentCourseCode: 'AH   1702 05',
        term: 'SP',
        year: 2020,
      },
    ]);

    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      // Parent course is in the list (and still active)
      // but not the child section IDM-6610-20-W20
      // if the section is not in jex's list of active courses
      // the drop should be ignored
      {
        id: 'GWD-6610-20-W20',
        name: 'Web Development',
        courseCode: 'GWD  6610 20',
        parentCourseCode: 'GWD  6610 20',
        term: 'SP',
        year: 2020,
        startDate: '2020-01-21',
        endDate: '2020-05-12',
        openDate: '2019-01-19',
        closeDate: '2020-05-31T23:59:59.000-05:00',
      },
      {
        id: 'AH-1702-05-W20',
        name: 'Art History 2',
        courseCode: 'AH   1702 05',
        parentCourseCode: 'AH   1702 05',
        term: 'SP',
        year: 2020,
        startDate: '2020-01-21',
        endDate: '2020-05-12',
        openDate: '2019-01-19',
        closeDate: '2020-05-31T23:59:59.000-05:00',
      },
    ]);

    const csv = await generateEnrollDrops();
    expect(csv).toMatchInlineSnapshot(`
      "section_id,user_id,role,status
      AH-1702-05-W20,444,student,deleted"
    `);
  });
});

import generateEnrollAdds from './generateEnrollAdds';
import canvas from '../services/canvas';
import jex from '../services/jex';

describe.only('generateEnrollAdds', () => {
  afterEach(() => {
    jest.resetAllMocks();
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
});

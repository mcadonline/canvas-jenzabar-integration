import generateEnrollDrops from './generateEnrollDrops';
import canvas from '../services/canvas';
import jex from '../services/jex';

describe('generateEnrollDrops', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('generates CSV of students to drop from sections in Canvas', async () => {
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

    const csv = await generateEnrollDrops();

    expect(csv).toEqual(
      [`"section_id","user_id","role","status"`, `"GWD-6610-20-F18","2","student","deleted"`].join(
        '\n'
      )
    );
  });
});

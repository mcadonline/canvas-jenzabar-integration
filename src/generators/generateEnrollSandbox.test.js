import generateEnrollSandbox from './generateEnrollSandbox';
import jex from '../services/jex';
import canvas from '../services/canvas';

describe('generateEnrollSandbox', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates an enrollment list for sandboxes courses', async () => {
    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([
      {
        id: 123,
        firstName: 'Elaine',
        preferredName: 'Laney',
        lastName: 'Benes',
        personalEmail: 'elaine@jpederman.com',
        mcadEmail: 'ebenes@mcad.edu',
        username: 'ebenes',
      },
    ]);

    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment.mockResolvedValue([]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        id: 123,
        sis_course_id: 'SANDBOX-EBENES',
        course_code: 'SANDBOX-EBENES',
        name: 'SANDBOX: Elaine Benes',
        status: 'available',
        start_date: null,
        end_date: null,
        course_format: 'online',
        total_students: 0,
      },
    ]);

    const csv = await generateEnrollSandbox();

    expect(csv).toMatchInlineSnapshot(`
      "course_id,user_id,role,status
      SANDBOX-EBENES,123,teacher,active"
    `);
  });
});

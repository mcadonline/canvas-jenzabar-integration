import generateSandboxes from './generateSandboxes';
import jex from '../services/jex';
import canvas from '../services/canvas';

describe('generateSandboxes', () => {
  it('matches CanvasCSV format', async () => {
    const csv = await generateSandboxes();
    const firstLine = csv.split('\n')[0];
    expect(firstLine).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status,blueprint_course_id
      "
    `);
  });

  it('creates a sandbox for every current and future faculty people', async () => {
    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([
      {
        id: 1,
        firstName: 'Elaine',
        preferredName: 'Laney',
        lastName: 'Benes',
        personalEmail: 'elaine@jpederman.com',
        mcadEmail: 'ebenes@mcad.edu',
        username: 'ebenes',
      },
      {
        id: 2,
        firstName: 'George',
        preferredName: null,
        lastName: 'Costanza',
        personalEmail: 'art@vandelayindustries.com',
        mcadEmail: 'gcostanza@mcad.edu',
        username: 'gcostanza',
      },
    ]);

    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment.mockResolvedValue([]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([]);

    const csv = await generateSandboxes();
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status,blueprint_course_id
      SANDBOX-EBENES,SANDBOX-EBENES,SANDBOX: EBENES,active,TEMPLATE-ENHANCEDCOURSE
      SANDBOX-GCOSTANZA,SANDBOX-GCOSTANZA,SANDBOX: GCOSTANZA,active,TEMPLATE-ENHANCEDCOURSE"
    `);
  });

  it.todo('creates a sandbox for every person enrolled in OL workshop courses');

  it.todo(
    'doesnt have duplicates, for instance if an instructor is also enrolled in a faculty workshop'
  );

  it.todo('doesnt create a sandbox if one already exists in Canvas');

  it.todo('create a sandbox with course id like SANDBOX-USERNAME');

  it.todo('creates a sandbox with long name like SANDBOX: Firstname Lastname');
});

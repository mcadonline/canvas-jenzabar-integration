import { jest } from '@jest/globals';
import generateSandboxes from './generateSandboxes';
import jex from '../services/jex';
import canvas from '../services/canvas';

describe('generateSandboxes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
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
      SANDBOX-EBENES,SANDBOX-EBENES,SANDBOX: Laney Benes,active,TEMPLATE-SANDBOXCOURSE
      SANDBOX-GCOSTANZA,SANDBOX-GCOSTANZA,SANDBOX: George Costanza,active,TEMPLATE-SANDBOXCOURSE"
    `);
  });

  it('creates a sandbox for every person enrolled in OL workshops (courses like OL-0xxx)', async () => {
    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([]);

    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment.mockResolvedValue([
      {
        id: 1,
        firstName: 'Elaine',
        preferredName: 'Laney',
        lastName: 'Benes',
        mcadEmail: 'ebenes@mcad.edu',
        username: 'ebenes',
        courseCode: 'OL   0110 20',
        term: 'FA',
        year: 2020,
      },
      {
        id: 2,
        firstName: 'George',
        preferredName: null,
        lastName: 'Costanza',
        mcadEmail: 'gcostanza@mcad.edu',
        username: 'gcostanza',
        // non-workshop course participatnts shouldn't have sandbox.
        courseCode: 'OL   1000 20',
        term: 'FA',
        year: 2020,
      },
    ]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([]);
    const csv = await generateSandboxes();
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status,blueprint_course_id
      SANDBOX-EBENES,SANDBOX-EBENES,SANDBOX: Laney Benes,active,TEMPLATE-SANDBOXCOURSE"
    `);
  });

  it('doesnt have duplicates, for instance if an instructor is also enrolled in a faculty workshop', async () => {
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
    ]);

    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment.mockResolvedValue([
      {
        id: 1,
        firstName: 'Elaine',
        preferredName: 'Laney',
        lastName: 'Benes',
        mcadEmail: 'ebenes@mcad.edu',
        username: 'ebenes',
        courseCode: 'OL   0110 20',
        term: 'FA',
        year: 2020,
      },
    ]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([]);

    const csv = await generateSandboxes();
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status,blueprint_course_id
      SANDBOX-EBENES,SANDBOX-EBENES,SANDBOX: Laney Benes,active,TEMPLATE-SANDBOXCOURSE"
    `);
  });

  it('doesnt create a sandbox if one already exists in Canvas', async () => {
    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([
      // pretend that this user already has a sandbox
      {
        id: 1,
        firstName: 'Elaine',
        preferredName: 'Laney',
        lastName: 'Benes',
        personalEmail: 'elaine@jpederman.com',
        mcadEmail: 'ebenes@mcad.edu',
        username: 'ebenes',
      },
      // pretend that this user does not have a sandbox
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

    const csv = await generateSandboxes();
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status,blueprint_course_id
      SANDBOX-GCOSTANZA,SANDBOX-GCOSTANZA,SANDBOX: George Costanza,active,TEMPLATE-SANDBOXCOURSE"
    `);
  });

  it('create a sandbox with course id like SANDBOX-USERNAME', async () => {
    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([
      {
        id: 1,
        firstName: 'First',
        preferredName: 'Preferred',
        lastName: 'Last',
        username: 'username',
      },
    ]);

    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment.mockResolvedValue([]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([]);

    const csv = await generateSandboxes();
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status,blueprint_course_id
      SANDBOX-USERNAME,SANDBOX-USERNAME,SANDBOX: Preferred Last,active,TEMPLATE-SANDBOXCOURSE"
    `);
  });

  it('creates a sandbox with long name like SANDBOX: PreferredName Lastname', async () => {
    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([
      {
        id: 1,
        firstName: 'FirstName',
        preferredName: 'PreferredName',
        lastName: 'LastName',
        username: 'username',
      },
    ]);

    jest.spyOn(jex, 'getStudentEnrollment');
    jex.getStudentEnrollment.mockResolvedValue([]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([]);

    const csv = await generateSandboxes();
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status,blueprint_course_id
      SANDBOX-USERNAME,SANDBOX-USERNAME,SANDBOX: PreferredName LastName,active,TEMPLATE-SANDBOXCOURSE"
    `);
  });
});

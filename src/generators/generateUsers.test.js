import generateUsers from './generateUsers';
import canvas from '../services/canvas';
import jex from '../services/jex';

describe('generateUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates a list of new users to add to Canvas', async () => {
    jest.spyOn(canvas, 'getActiveSections');
    jest.spyOn(jex, 'getStudentEnrollment');
    jest.spyOn(canvas, 'getUsers');

    // for each active canvas section
    canvas.getActiveSections.mockResolvedValue([
      {
        id: 155,
        name: 'AH-1000-20-F20',
        sis_course_id: 'AH-1000-20-F20',
        sis_section_id: 'AH-1000-20-F20',
      },
    ]);

    // it will look at jex to determine the users who need accounts
    jex.getStudentEnrollment.mockResolvedValue([
      {
        id: 1,
        username: 'user1',
        firstName: 'User',
        preferredName: null,
        lastName: 'One',
        mcadEmail: 'user1@mcad.edu',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: '2020',
      },
      {
        id: 2,
        username: 'user2',
        firstName: 'User',
        preferredName: null,
        lastName: 'Two',
        mcadEmail: 'user2@mcad.edu',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: '2020',
      },
    ]);
    canvas.getUsers.mockResolvedValue([]);

    const csv = await generateUsers();
    expect(csv).toEqual(
      [
        `"user_id","login_id","first_name","last_name","email","status"`,
        `"1","1","User","One","user1@mcad.edu","active"`,
        `"2","2","User","Two","user2@mcad.edu","active"`,
      ].join('\n')
    );
  });
  it('uses preferred names instead of first names', async () => {
    jest.spyOn(canvas, 'getActiveSections');
    jest.spyOn(jex, 'getStudentEnrollment');
    jest.spyOn(canvas, 'getUsers');

    // for each active canvas section
    canvas.getActiveSections.mockResolvedValue([
      {
        id: 155,
        name: 'AH-1000-20-F20',
        sis_course_id: 'AH-1000-20-F20',
        sis_section_id: 'AH-1000-20-F20',
      },
    ]);

    // it will look at jex to determine the users who need accounts
    jex.getStudentEnrollment.mockResolvedValue([
      {
        id: 1,
        username: 'user1',
        firstName: 'User',
        preferredName: 'Preferred',
        lastName: 'One',
        mcadEmail: 'user1@mcad.edu',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: '2020',
      },
    ]);
    canvas.getUsers.mockResolvedValue([]);

    const csv = await generateUsers();
    expect(csv).toEqual(
      [
        `"user_id","login_id","first_name","last_name","email","status"`,
        `"1","1","Preferred","One","user1@mcad.edu","active"`,
      ].join('\n')
    );
  });
  it('does not include users who already have accounts in Canvas', async () => {
    jest.spyOn(canvas, 'getActiveSections');
    jest.spyOn(jex, 'getStudentEnrollment');
    jest.spyOn(canvas, 'getUsers');

    // for each active canvas section
    canvas.getActiveSections.mockResolvedValue([
      {
        id: 155,
        name: 'AH-1000-20-F20',
        sis_course_id: 'AH-1000-20-F20',
        sis_section_id: 'AH-1000-20-F20',
      },
    ]);

    // it will look at jex to determine the users who need accounts
    jex.getStudentEnrollment.mockResolvedValue([
      {
        id: 1,
        username: 'user1',
        firstName: 'User',
        preferredName: null,
        lastName: 'One',
        mcadEmail: 'user1@mcad.edu',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: '2020',
      },
      {
        id: 2,
        username: 'user2',
        firstName: 'User',
        preferredName: null,
        lastName: 'Two',
        mcadEmail: 'user2@mcad.edu',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: '2020',
      },
    ]);
    canvas.getUsers.mockResolvedValue([
      {
        id: 1,
        name: 'User One',
        sortable_name: 'One, User',
        short_name: 'User',
        sis_user_id: '1',
        email: 'user1@mcad.edu',
        login_id: '1',
      },
    ]);

    const csv = await generateUsers();
    expect(csv).toEqual(
      [
        `"user_id","login_id","first_name","last_name","email","status"`,
        `"2","2","User","Two","user2@mcad.edu","active"`,
      ].join('\n')
    );
  });
  it('ignores users without a username set in Jex', async () => {
    jest.spyOn(canvas, 'getActiveSections');
    jest.spyOn(jex, 'getStudentEnrollment');
    jest.spyOn(canvas, 'getUsers');

    // for each active canvas section
    canvas.getActiveSections.mockResolvedValue([
      {
        id: 155,
        name: 'AH-1000-20-F20',
        sis_course_id: 'AH-1000-20-F20',
        sis_section_id: 'AH-1000-20-F20',
      },
    ]);

    // it will look at jex to determine the users who need accounts
    jex.getStudentEnrollment.mockResolvedValue([
      {
        id: 1,
        username: null,
        firstName: 'User',
        preferredName: null,
        lastName: 'One',
        mcadEmail: 'user1@mcad.edu',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: '2020',
      },
    ]);
    canvas.getUsers.mockResolvedValue([]);

    const csv = await generateUsers();
    expect(csv).toEqual(
      [
        `"user_id","login_id","first_name","last_name","email","status"`,
        `"1","1","User","One","user1@mcad.edu","active"`,
      ].join('\n')
    );
  });
  it('includes users who need updates (e.g. last name change)', async () => {
    jest.spyOn(canvas, 'getActiveSections');
    jest.spyOn(jex, 'getStudentEnrollment');
    jest.spyOn(canvas, 'getUsers');

    // for each active canvas section
    canvas.getActiveSections.mockResolvedValue([
      {
        id: 155,
        name: 'AH-1000-20-F20',
        sis_course_id: 'AH-1000-20-F20',
        sis_section_id: 'AH-1000-20-F20',
      },
    ]);

    // it will look at jex to determine the users who need accounts
    jex.getStudentEnrollment.mockResolvedValue([
      {
        id: 1,
        username: 'user1',
        firstName: 'New',
        preferredName: null,
        lastName: 'One',
        mcadEmail: 'user1@mcad.edu',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: '2020',
      },
      {
        id: 2,
        username: 'user2',
        firstName: 'User',
        preferredName: null,
        lastName: 'Two',
        mcadEmail: 'new_email@mcad.edu',
        courseCode: 'AH   1000 20',
        parentCourseCode: 'AH   1000 20',
        term: 'FA',
        year: '2020',
      },
    ]);

    canvas.getUsers.mockResolvedValue([
      {
        id: 1,
        name: 'Old Name',
        sortable_name: 'Name, Old',
        short_name: 'Name',
        sis_user_id: '1',
        email: 'user1@mcad.edu',
        login_id: '1',
      },
      {
        id: 2,
        name: 'User Two',
        sortable_name: 'Two, User',
        short_name: 'Two',
        sis_user_id: '2',
        email: 'old_email@mcad.edu',
        login_id: '2',
      },
    ]);

    const csv = await generateUsers();
    expect(csv).toEqual(
      [
        `"user_id","login_id","first_name","last_name","email","status"`,
        `"1","1","New","One","user1@mcad.edu","active"`,
        `"2","2","User","Two","new_email@mcad.edu","active"`,
      ].join('\n')
    );
  });
  it.todo('includes faculty users');
});

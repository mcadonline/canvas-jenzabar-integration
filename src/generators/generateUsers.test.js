import generateUsers from './generateUsers';
import canvas from '../services/canvas';
import jex from '../services/jex';

describe('generateUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates a list of new users to add to Canvas', async () => {
    // it will look at jex to determine the users who need accounts
    jest.spyOn(jex, 'getStudentEnrollment');
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

    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([
      {
        id: 3,
        firstName: 'Elaine',
        preferredName: 'Laney',
        lastName: 'Benis',
        personalEmail: 'elaine.benis@jpederman.com',
        mcadEmail: 'ebenis@mcad.edu',
        username: 'ebenis',
      },
    ]);

    jest.spyOn(canvas, 'getUsers');
    canvas.getUsers.mockResolvedValue([]);

    const csv = await generateUsers();
    expect(csv).toEqual(
      [
        `"user_id","login_id","first_name","last_name","email","status"`,
        `"1","1","User","One","user1@mcad.edu","active"`,
        `"2","2","User","Two","user2@mcad.edu","active"`,
        `"3","3","Laney","Benis","ebenis@mcad.edu","active"`,
      ].join('\n')
    );
  });
  it('uses preferred names instead of first names', async () => {
    // it will look at jex to determine the users who need accounts
    jest.spyOn(jex, 'getStudentEnrollment');
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

    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([]);

    jest.spyOn(canvas, 'getUsers');
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
    // it will look at jex to determine the users who need accounts
    jest.spyOn(jex, 'getStudentEnrollment');
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

    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([
      {
        id: 3,
        firstName: 'Elaine',
        preferredName: 'Laney',
        lastName: 'Benis',
        personalEmail: 'elaine.benis@jpederman.com',
        mcadEmail: 'ebenis@mcad.edu',
        username: 'ebenis',
      },
    ]);

    jest.spyOn(canvas, 'getUsers');
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
      {
        id: 3,
        name: 'Laney Benis',
        sortable_name: 'Benis, Laney',
        short_name: 'Laney',
        sis_user_id: '3',
        email: 'ebenis@mcad.edu',
        login_id: '3',
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
  it('includes users who need updates (e.g. last name change)', async () => {
    // it will look at jex to determine the users who need accounts
    jest.spyOn(jex, 'getStudentEnrollment');
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
    ]);

    jest.spyOn(jex, 'getInstructors');
    jex.getInstructors.mockResolvedValue([
      {
        id: 2,
        username: 'user2',
        firstName: 'User',
        preferredName: null,
        lastName: 'Two',
        mcadEmail: 'new_email@mcad.edu',
      },
    ]);

    jest.spyOn(canvas, 'getUsers');
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

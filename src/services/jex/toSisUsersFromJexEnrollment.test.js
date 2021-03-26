import toSisUsersFromJexEnrollment from './toSisUsersFromJexEnrollment';
import jex from './jexService';

const jexEnrollment = [
  {
    id: 1,
    firstName: 'Elaine',
    preferredName: 'Laney',
    lastName: 'benes',
    mcadEmail: 'ebenes@mcad.edu',
    username: 'ebenes',
    courseCode: 'GWD  6610 20',
    parentCourseCode: 'GWD  6610 20',
    term: 'FA',
    year: '2018',
  },
  {
    id: 1,
    firstName: 'Elaine',
    preferredName: 'Laney',
    lastName: 'benes',
    mcadEmail: 'ebenes@mcad.edu',
    username: 'ebenes',
    courseCode: 'AH   1701 01',
    parentCourseCode: 'AH   1701 01',
    term: 'FA',
    year: '2018',
  },
  {
    id: 2,
    firstName: 'George',
    preferredName: null,
    lastName: 'Costanza',
    mcadEmail: 'gcostanza@mcad.edu',
    username: 'gcostanza123',
    courseCode: 'GWD  6610 20',
    parentCourseCode: 'GWD  6610 20',
    term: 'FA',
    year: '2018',
  },
];

const sisUsers = toSisUsersFromJexEnrollment(jexEnrollment);

describe('toSisUsersFromJexUser', () => {
  afterAll(() => jex.close());

  it('has the expected properties', () => {
    sisUsers.forEach((user) =>
      expect(Object.keys(user)).toEqual([
        'user_id',
        'login_id',
        'first_name',
        'last_name',
        'email',
        'status',
      ])
    );
  });

  it('removes duplicate users', () => {
    expect(sisUsers.length).toBe(jexEnrollment.length - 1);
  });

  it('can convert a single object', () => {
    const singleJexUser = jexEnrollment[0];
    expect(toSisUsersFromJexEnrollment(singleJexUser)).toEqual(sisUsers[0]);
  });
});

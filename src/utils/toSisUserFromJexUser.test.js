import toSisUserFromJexUser from './toSisUserFromJexUser';

const jexUsers = [
  {
    id: 1,
    firstName: 'Elaine',
    preferredName: 'Laney',
    middleName: null,
    lastName: 'Benis',
    personalEmail: 'elaine.benis@jpederman.com',
    mcadEmail: 'ebenis@mcad.edu',
    username: 'ebenis',
  },
  {
    id: 2,
    firstName: 'George',
    preferredName: null,
    middleName: null,
    lastName: 'Costanza',
    personalEmail: 'art@vandelayindustries.com',
    mcadEmail: 'gcostanza@mcad.edu',
    username: 'gcostanza123',
  },
];

const sisUsers = toSisUserFromJexUser(jexUsers);

describe('toSisUserFromJexUser', () => {
  it('has the expected properties', () => {
    sisUsers.forEach(user => expect(Object.keys(user)).toEqual([
      'user_id',
      'login_id',
      'first_name',
      'last_name',
      'email',
      'status',
    ]));
  });

  it('converts all objects', () => {
    expect(sisUsers.length).toBe(jexUsers.length);
  });

  it('can convert a single object', () => {
    const singleJexUser = jexUsers[0];
    expect(toSisUserFromJexUser(singleJexUser)).toEqual(sisUsers[0]);
  });
});

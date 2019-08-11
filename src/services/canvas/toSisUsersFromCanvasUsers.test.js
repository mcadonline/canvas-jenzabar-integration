/* eslint-disable camelcase */
import toSisUsersFromCanvasUsers from './toSisUsersFromCanvasUsers';

/**
 * Converts to SIS Integration fiendly data, given user data from the canvas api
 * https://canvas.instructure.com/doc/api/file.sis_csv.html
 */

const canvasUsers = [
  {
    id: 123,
    name: 'Elaine Benis',
    created_at: '2018-12-02T11:32:08-06:00',
    sortable_name: 'Benis, Elaine',
    short_name: 'Elaine Benis',
    sis_user_id: '1234567',
    integration_id: null,
    sis_import_id: 5,
    login_id: '1234567',
    email: 'ebenis@gmail.com',
  },
  {
    id: 456,
    name: 'George Costanza',
    created_at: '2018-12-02T11:32:08-06:00',
    sortable_name: 'Costanza, George',
    short_name: 'George Costanza',
    sis_user_id: '8675309',
    integration_id: null,
    sis_import_id: 5,
    login_id: '8675309',
    email: 'vandelayindustries@gmail.com',
  },
];

const sisUsers = toSisUsersFromCanvasUsers(canvasUsers);

describe('toSisUserFromCanvasUser', () => {
  it('set user_id to sis_user_id', () => {
    sisUsers.forEach((u, i) => expect(u.user_id).toEqual(canvasUsers[i].sis_user_id));
  });
  it('makes first_name and last_name from sortable_name', () => {
    const { first_name, last_name } = sisUsers[0];
    expect(first_name).toBe('Elaine');
    expect(last_name).toBe('Benis');
  });
  it('has the expected properties', () => {
    sisUsers.forEach(u => expect(Object.keys(u)).toEqual([
      'user_id',
      'login_id',
      'first_name',
      'last_name',
      'email',
      'status',
    ]));
  });
  it('converts a single user', () => {
    const singleSisUser = toSisUsersFromCanvasUsers(canvasUsers[0]);
    expect(singleSisUser).toEqual(sisUsers[0]);
  });
});

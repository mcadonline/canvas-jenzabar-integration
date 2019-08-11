import toSisUserFromCanvasUser from './toSisUserFromCanvasUser';

/**
 * Converts to SIS Integration fiendly data, given user data from the canvas api
 * https://canvas.instructure.com/doc/api/file.sis_csv.html
 */

const canvasUser = {
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
};
describe('toSisUserFromCanvasUser', () => {
  const sisUser = toSisUserFromCanvasUser(canvasUser);
  it('set user_id to sis_user_id', () => {
    expect(sisUser.user_id).toEqual(canvasUser.sis_user_id);
  });
  it('makes first_name and last_name from sortable_name', () => {
    expect(sisUser.first_name).toBe('Elaine');
    expect(sisUser.last_name).toBe('Benis');
  });
  it('has the expected properties', () => {
    expect(Object.keys(sisUser)).toEqual([
      'user_id',
      'login_id',
      'first_name',
      'last_name',
      'email',
      'status',
    ]);
  });
});

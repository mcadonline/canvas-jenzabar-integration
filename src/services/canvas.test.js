import fetch from 'node-fetch';
import canvas from './canvas';

jest.mock('node-fetch');

const mockData = [
  {
    id: 1,
    name: 'User Lastname',
    sortable_name: 'Lastname, User',
    short_name: 'User',
    sis_user_id: null,
    integration_id: null,
    sis_import_id: null,
    login_id: 'test-user',
  },
  {
    id: 2,
    name: 'Test WithSISId',
    sortable_name: 'WithSISId, Test',
    short_name: 'Test',
    sis_user_id: '12345',
    integration_id: null,
    sis_import_id: null,
    login_id: '12345',
  },
];

describe('getUser', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: () => mockData,
    });
  });

  it('should call fetch', async () => {
    await canvas.getUsers('https://example.com', { Authorization: 'Bearer 12345' });
    expect(fetch).toBeCalled();
  });

  it('should return user data', async () => {
    const users = await canvas.getUsers('https://example.com', { Authorization: 'Bearer 12345' });

    // see: https://canvas.instructure.com/doc/api/file.sis_csv.html
    expect(Object.keys(users[0])).toEqual([
      'user_id', // SIS ID
      'login_id', // Also SIS ID
      'first_name', // preferred name or first name
      'last_name',
      'email', // mcad email if active
      'status', // active
    ]);
  });
});

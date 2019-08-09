import fetch from 'node-fetch';
import getUsers from './getUsersFromCanvas';

jest.mock('node-fetch');

const mockDataFromApi = [
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
    email: '123@compuserve.net',
  },
];

describe('getUser', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: () => mockDataFromApi,
      headers: {
        get: () => undefined,
      },
    });
  });

  it('should call fetch', async () => {
    await getUsers('https://example.com', { Authorization: 'Bearer 12345' });
    expect(fetch).toBeCalled();
  });

  it('should return user data', async () => {
    const users = await getUsers('https://example.com', { Authorization: 'Bearer 12345' });

    // see: https://canvas.instructure.com/doc/api/file.sis_csv.html
    expect(Object.keys(users[0])).toEqual([
      'user_id', // SIS ID
      'login_id', // Also SIS ID
      'first_name', // preferred name or first name
      'last_name',
      'email', // mcad email if active
      'status', // active
    ]);

    expect(users[0]).toEqual({
      first_name: 'User',
      last_name: 'Lastname',
      user_id: null,
      login_id: null,
      email: null,
      status: 'active',
    });

    expect(users[1]).toEqual({
      first_name: 'Test',
      last_name: 'WithSISId',
      user_id: 12345,
      login_id: 12345,
      email: '123@compuserve.net',
      status: 'active',
    });
  });

  it('should normalize integers as integers', async () => {
    const users = await getUsers('https://example.com', { Authorization: 'Bearer 12345' });
    const user2 = users[1];
    expect(user2.user_id).toBe(12345);
    expect(user2.login_id).toBe(12345);
    expect(user2.email).toBe('123@compuserve.net');
  });
});

import getStudentsFromJex from './getStudentsFromJex';

const mockData = [
  {
    sisId: 1,
    firstName: 'Elaine',
    preferredName: 'Laney',
    middleName: null,
    lastName: 'Benis',
    personalEmail: 'elaine.benis@jpederman.com',
    mcadEmail: 'ebenis@mcad.edu',
    username: 'ebenis',
  },
];

const jexService = {
  query: jest.fn().mockResolvedValue(mockData),
};

describe('getInstructorsFromJex', () => {
  it('returns a function given a jexService', () => {
    const fn = getStudentsFromJex(jest.fn());
    expect(typeof fn).toBe('function');
  });
  it('should match canvas user CSV', async () => {
    const getStudents = getStudentsFromJex(jexService);
    const users = await getStudents();

    expect(Object.keys(users[0])).toEqual([
      'user_id', // SIS ID
      'login_id', // Also SIS ID
      'first_name', // preferred name or first name
      'last_name',

      // NOTE: according to Mike H, mcadEmail in Jenz
      // should be personal email if CE student
      // and @mcad.edu email degree/cert seeking
      // so we don't need logic to determine if CE student
      // or not. Probably should test research this to
      // double-check.
      'email',
      'status', // active
    ]);
  });
});

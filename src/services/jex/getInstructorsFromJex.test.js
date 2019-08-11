import getInstructorsFromJex from './getInstructorsFromJex';

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
    const fn = getInstructorsFromJex(jexService);
    expect(typeof fn).toBe('function');
  });
  it('should match canvas user CSV', async () => {
    const getInstructors = getInstructorsFromJex(jexService);
    const users = await getInstructors();

    expect(Object.keys(users[0])).toEqual([
      'user_id', // SIS ID
      'login_id', // Also SIS ID
      'first_name', // preferred name or first name
      'last_name',
      'email', // instructors always use mcad email
      'status', // active
    ]);
  });
});

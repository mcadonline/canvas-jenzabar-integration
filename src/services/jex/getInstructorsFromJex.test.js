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
  it('should match canvas user CSV', async () => {
    const users = await getInstructorsFromJex(jexService);

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

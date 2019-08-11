import getStudentsFromJex from './getStudentsFromJex';

const mockData = [
  {
    id: 1,
    firstName: 'Elaine',
    preferredName: 'Laney',
    lastName: 'Benis',
    personalEmail: 'elaine.benis@jpederman.com',
    mcadEmail: 'ebenis@mcad.edu',
    username: 'ebenis',
  },
  {
    id: 2,
    firstName: 'George',
    preferredName: null,
    lastName: 'Costanza',
    personalEmail: 'art@vandelayindustries.com',
    mcadEmail: null,
    username: null,
  },
];

const jexService = {
  query: jest.fn().mockResolvedValue(mockData),
};

describe('getStudentsFromJex', () => {
  let getStudents;
  beforeEach(() => {
    getStudents = getStudentsFromJex(jexService);
  });

  it('returns a function given a jexService', () => {
    expect(typeof getStudents).toBe('function');
  });
  it('gets data', async () => {
    const users = await getStudents();
    expect(users[0]).toEqual(mockData[0]);
  });
  it('filters out any users with null username', async () => {
    const students = await getStudents();
    students.forEach(s => expect(s.username).toBeTruthy());
  });
});

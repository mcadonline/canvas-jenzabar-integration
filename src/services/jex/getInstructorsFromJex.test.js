import getInstructorsFromJex from './getInstructorsFromJex';

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

describe('getInstructorsFromJex', () => {
  let getInstructors;
  beforeEach(() => {
    getInstructors = getInstructorsFromJex(jexService);
  });

  it('returns a function given a jexService', () => {
    expect(typeof getInstructors).toBe('function');
  });
  it('gets data', async () => {
    const instructors = await getInstructors();
    expect(instructors[0]).toEqual(mockData[0]);
  });
  it('filters out any users with null username', async () => {
    const instructors = await getInstructors();
    instructors.forEach(i => expect(i.username).toBeTruthy());
  });
});

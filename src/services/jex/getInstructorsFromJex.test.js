import jexService from './jexService';
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

describe('getInstructorsFromJex', () => {
  it('gets data', async () => {
    jest.spyOn(jexService, 'query');
    jexService.query.mockResolvedValue(mockData);

    const instructors = await getInstructorsFromJex();
    expect(instructors).toMatchInlineSnapshot(`
      Array [
        Object {
          "firstName": "Elaine",
          "id": 1,
          "lastName": "Benis",
          "mcadEmail": "ebenis@mcad.edu",
          "personalEmail": "elaine.benis@jpederman.com",
          "preferredName": "Laney",
          "username": "ebenis",
        },
      ]
    `);
  });
  it('filters out any users with null username', async () => {
    jest.spyOn(jexService, 'query');
    jexService.query.mockResolvedValue(mockData);
    const instructors = await getInstructorsFromJex();
    instructors.forEach(i => expect(i.username).toBeTruthy());
  });
});

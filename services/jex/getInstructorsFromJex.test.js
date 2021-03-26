import { jest } from '@jest/globals';
import jexService from './jexService';
import getInstructorsFromJex from './getInstructorsFromJex';

const mockData = [
  {
    id: 1,
    firstName: 'Elaine',
    preferredName: 'Laney',
    lastName: 'benes',
    personalEmail: 'elaine.benes@jpederman.com',
    mcadEmail: 'ebenes@mcad.edu',
    username: 'ebenes',
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
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('gets data', async () => {
    jest.spyOn(jexService, 'query');
    jexService.query.mockResolvedValue(mockData);

    const instructors = await getInstructorsFromJex();
    expect(instructors).toMatchInlineSnapshot(`
      Array [
        Object {
          "firstName": "Elaine",
          "id": 1,
          "lastName": "benes",
          "mcadEmail": "ebenes@mcad.edu",
          "personalEmail": "elaine.benes@jpederman.com",
          "preferredName": "Laney",
          "username": "ebenes",
        },
      ]
    `);
  });
  it('filters out any users with null username', async () => {
    jest.spyOn(jexService, 'query');
    jexService.query.mockResolvedValue(mockData);
    const instructors = await getInstructorsFromJex();
    instructors.forEach((i) => expect(i.username).toBeTruthy());
  });
});

import jsonToCSV from './jsonToCSV';

describe('jsonToCSV', () => {
  it('converts a json collection to csv', () => {
    const collection = [
      { id: 1, firstName: 'Jerry', lastName: 'Seinfeld' },
      { id: 2, lastName: 'Benes', firstName: 'Elaine' },
      { id: 3, lastName: 'Kramer' },
    ];

    const expected = [
      '"id","firstName","lastName"',
      '"1","Jerry","Seinfeld"',
      '"2","Elaine","Benes"',
      '"3","","Kramer"',
    ].join('\n');

    expect(jsonToCSV(collection)).toEqual(expected);
  });
});

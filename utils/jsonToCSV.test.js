import jsonToCSV from './jsonToCSV';

describe('jsonToCSV', () => {
  it('converts a json collection to csv', () => {
    const collection = [
      { id: 1, firstName: 'Jerry', lastName: 'Seinfeld' },
      { id: 2, lastName: 'Benes', firstName: 'Elaine' },
      { id: 3, lastName: 'Kramer' },
      { id: 4, firstName: 'George "Georgey boy"', lastName: 'Costanza, Jr.' },
    ];

    expect(jsonToCSV(collection)).toMatchInlineSnapshot(`
      "id,firstName,lastName
      1,Jerry,Seinfeld
      2,Elaine,Benes
      3,,Kramer
      4,\\"George \\"\\"Georgey boy\\"\\"\\",\\"Costanza, Jr.\\""
    `);
  });
});

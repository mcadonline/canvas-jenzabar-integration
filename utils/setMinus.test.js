import setMinus from './setMinus';

describe('setMinus', () => {
  it('should return the difference between two arrays if no idKeyName is given', () => {
    const a = [1, 2, 3, 4, 5];
    const b = [1, 2, 3, 6];
    expect(setMinus(a, b)).toEqual([4, 5]);
  });

  it('diffs two collections based on idKeyName', () => {
    const a = [
      { id: 1, firstName: 'Jerry', lastName: 'Seinfeld' },
      { id: 2, lastName: 'Benes', firstName: 'Elaine' },
      { id: 3, lastName: 'Kramer' },
      { id: 4, firstName: 'George', lastName: 'Costanza' },
    ];

    // only looks at id
    const b = [
      { id: 2 }, // Elaine
      { id: 4 }, // George
      { id: 5, lastName: 'Newman' }, // Newman
    ];

    const expected = [
      { id: 1, firstName: 'Jerry', lastName: 'Seinfeld' },
      { id: 3, lastName: 'Kramer' },
    ];

    expect(setMinus(a, b, 'id')).toEqual(expected);
  });
});

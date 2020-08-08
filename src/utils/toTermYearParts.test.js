import toTermYearParts from './toTermYearParts';

describe('toTermYearParts', () => {
  it('converts a termYear string into term and year', () => {
    expect(toTermYearParts('F20')).toEqual({
      term: 'FA',
      year: '2020',
    });
    expect(toTermYearParts('S21')).toEqual({
      term: 'SU',
      year: '2021',
    });
    expect(toTermYearParts('W21')).toEqual({
      term: 'SP',
      year: '2021',
    });
  });
});

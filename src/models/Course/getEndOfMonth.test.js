import getEndOfMonth from './getEndOfMonth';

describe('getEndOfMonth', () => {
  it('gets the end of the month', () => {
    expect(getEndOfMonth('2020-02-04')).toBe('2020-02-29T23:59:59.000-06:00');
  });
});

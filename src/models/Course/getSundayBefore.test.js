import getSundayBefore from './getSundayBefore';

describe('getSundayBefore', () => {
  it('gets sunday prior to given iso date string', () => {
    expect(getSundayBefore('2020-02-01')).toBe('2020-01-26');
    // if Sunday, still get prior sunday;
    expect(getSundayBefore('2020-03-01')).toBe('2020-02-23');
  });
});

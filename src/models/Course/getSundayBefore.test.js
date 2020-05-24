import getSundayBefore from './getSundayBefore';

describe('getSundayBefore', () => {
  it('gets sunday prior to given iso date string', () => {
    expect(getSundayBefore('2020-02-01')).toMatchInlineSnapshot(`"2020-01-26T00:00:00.000-06:00"`);
    // if Sunday, still get prior sunday;
    expect(getSundayBefore('2020-03-01')).toMatchInlineSnapshot(`"2020-02-23T00:00:00.000-06:00"`);
  });
});

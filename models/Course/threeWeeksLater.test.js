import { describe, expect, it } from '@jest/globals';
import threeWeeksLater from './threeWeeksLater.js';

describe('threeWeeksLater', () => {
  it('gets a date 3 weeks later', () => {
    expect(threeWeeksLater('2021-04-27')).toBe('2021-05-18T00:00:00.000-05:00');
    expect(threeWeeksLater('2021-12-31T11:59:59.000-06:00')).toBe('2022-01-21T11:59:59.000-06:00');
  });
});

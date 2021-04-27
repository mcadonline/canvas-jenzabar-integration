import { describe, expect, it } from '@jest/globals';
import endOfDay from './endOfDay.js';

describe('endOfDay', () => {
  it('11:59:59pm (local time) on a given ISO Date', () => {
    expect(endOfDay('2021-11-14')).toBe('2021-11-14T23:59:59.000-06:00');
  });
});

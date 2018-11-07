import toRealYear from './toRealYear';

test('toRealYear: converts a jexYear to real year', () => {
  expect(toRealYear({ term: 'FA', jexYear: 2017 })).toBe(2017);
  expect(toRealYear({ term: 'SP', jexYear: 2017 })).toBe(2018);
  expect(toRealYear({ term: 'SU', jexYear: '2017' })).toBe(2018);
});

test('toRealYear: throws if missing term or jexYear', () => {
  expect(() => toRealYear({ term: 'FA' })).toThrow();
  expect(() => toRealYear({ jexYear: 2017 })).toThrow();
});

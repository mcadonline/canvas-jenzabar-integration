import toJexYear from './toJexYear';

test('toJexYear returns a jex year given a real year', () => {
  expect(toJexYear({ term: 'SP', realYear: '2018' })).toBe(2017);
  expect(toJexYear({ term: 'SU', realYear: 2018 })).toBe(2017);
  expect(toJexYear({ term: 'FA', realYear: 2020 })).toBe(2020);
});

test('toJexYear throws if missing arguments', () => {
  expect(() => toJexYear({ term: 'SP' })).toThrow(Error);
});

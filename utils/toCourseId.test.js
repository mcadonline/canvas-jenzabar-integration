import toCourseId from './toCourseId';

describe('toCourseId', () => {
  it('converts an obj with course code, term, and year to an course id', () => {
    expect(
      toCourseId({
        courseCode: 'IDM  6610 20',
        term: 'FA',
        year: 2018,
      }),
    ).toEqual('IDM-6610-20-F18');

    expect(
      toCourseId({
        courseCode: 'AH   1234 01',
        term: 'SP',
        year: 2019,
      }),
    ).toEqual('AH-1234-01-W19');
  });
});

import isValidCSV from './isValidCSV';

describe('isValidCSV', () => {
  it('true if valid csv', () => {
    const csv = [`"course_id","student_id"`, `"123","456"`, `"111","222"`].join('\n');
    expect(isValidCSV(csv)).toBe(true);
  });
  it('each record contains the same number of entries', () => {
    const badCSV = [`"1","2"`, `"1","2","3"`].join('\n');
    expect(isValidCSV(badCSV)).toBe(false);
  });
  it('false is missing comma', () => {
    const badCSV = `"1""2","3"`;
    expect(isValidCSV(badCSV)).toBe(false);
  });
});

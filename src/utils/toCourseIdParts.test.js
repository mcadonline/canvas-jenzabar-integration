import toCourseIdParts from './toCourseIdParts';

describe('toCourseIdParts', () => {
  it('takes a sis course or section id string and returns courseCode, term, year', () => {
    expect(toCourseIdParts('GWD-6610-20-F20')).toMatchInlineSnapshot(`
      Object {
        "courseCode": "GWD  6610 20",
        "courseNumber": "6610",
        "dept": "GWD",
        "section": "20",
        "suffix": undefined,
        "term": "FA",
        "year": "2020",
      }
    `);
  });
  it('handles courses/sections with suffix', () => {
    expect(toCourseIdParts('GWD-6610-20-F20-WHATEVER')).toMatchInlineSnapshot(`
      Object {
        "courseCode": "GWD  6610 20",
        "courseNumber": "6610",
        "dept": "GWD",
        "section": "20",
        "suffix": "WHATEVER",
        "term": "FA",
        "year": "2020",
      }
    `);
  });
});

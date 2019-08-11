import toSisSectionsFromJexCourses from './toSisSectionsFromJexCourses';

const jexCourses = [
  {
    courseCode: 'GWD   6610 20',
    term: 'FA',
    year: 2019,
    parentCourseCode: 'GWD   6610 20',
  },
  {
    courseCode: 'AH   3862 01',
    term: 'FA',
    year: 2019,
    parentCourseCode: 'AH   3862 01',
  },
  {
    courseCode: 'HS   3862 01',
    term: 'FA',
    year: 2019,
    parentCourseCode: 'AH   3862 01',
  },
];

const sisSections = toSisSectionsFromJexCourses(jexCourses);

describe('toSisSectionsFromJexCourses', () => {
  it('includes the correct properties', () => {
    sisSections.forEach(s => expect(Object.keys(s)).toEqual(['section_id', 'course_id', 'name', 'status']));
  });
  it('sets section name to be the section_id', () => {
    sisSections.forEach(s => expect(s.name).toBe(s.section_id));
  });

  it('sets status as active', () => {
    sisSections.forEach(s => expect(s.status).toBe('active'));
  });

  it('can convert a single section', () => {
    const singleJexCourse = jexCourses[0];
    const singleSisSection = toSisSectionsFromJexCourses(singleJexCourse);
    expect(singleSisSection).toEqual(sisSections[0]);
  });
});

import isCourse from './isCourse';

const validCourse = {
  closeDate: '2019-12-31T23:59:59.000-06:00',
  courseFormat: 'online',
  endDate: '2019-12-15',
  id: 'GWD-6610-20-F19',
  courseCode: 'GWD  6610 20',
  parentCourseCode: 'GWD  6610 20',
  instructor: {
    firstName: 'James',
    lastName: 'Johnson',
  },
  name: 'Web Development: HTML and CSS -- J. Johnson (Sect. 20 - Fall 2019)',
  openDate: '2019-08-25',
  startDate: '2019-09-01',
  term: 'FA',
  year: 2019,
};

describe('isCourse', () => {
  it('tests is an object is a Course', () => {
    expect(isCourse(validCourse)).toBe(true);
    expect(isCourse({})).toBe(false);
  });
  it('has expected keys', () => {
    const expectedKeys = [
      'id',
      'name',
      'courseCode',
      'parentCourseCode',
      'term',
      'year',
      'startDate',
      'endDate',
      'openDate',
      'closeDate',
      'courseFormat',
      'instructor',
    ];
    expectedKeys.forEach(key => expect(isCourse({ ...validCourse, [key]: undefined })).toBe(false));
  });
});

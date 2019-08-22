import toSisEnrollmentFromJexEnrollment from './toSisEnrollmentFromJexEnrollment';

const jexEnrollments = [
  {
    id: 1,
    username: 'user1',
    courseCode: 'GWD  6610 20',
    parentCourseCode: 'GWD  6610 20',
    term: 'FA',
    year: '2018',
  },
  {
    id: 1,
    username: 'user1',
    courseCode: 'AH   1000 01',
    parentCourseCode: 'AH   1000 01',
    term: 'FA',
    year: '2018',
  },
  {
    id: 2,
    username: 'user2',
    courseCode: 'HS  1000 01',
    parentCourseCode: 'AH   1000 01',
    term: 'FA',
    year: '2028',
  },
];

const sisEnrollments = toSisEnrollmentFromJexEnrollment(jexEnrollments);

describe('toSisEnrollmentFromJexEnrollment', () => {
  it('creates expected object shape', () => {
    expect(sisEnrollments.length).toBe(3);
    sisEnrollments.forEach((sisEnrollment) => {
      expect(Object.keys(sisEnrollment)).toEqual(['section_id', 'user_id', 'role', 'status']);
    });
  });
  it('sets role to student', () => {
    expect(sisEnrollments.every(e => e.role === 'student')).toBe(true);
  });

  it('has active status', () => {
    expect(sisEnrollments.every(e => e.status === 'active')).toBe(true);
  });

  it('user_id is a string', () => {
    sisEnrollments.forEach(e => expect(typeof e.user_id).toBe('string'));
  });

  it('converts a single enrollment', () => {
    const singleCanvasEnrollment = jexEnrollments[0];
    const singleSisEnrollment = toSisEnrollmentFromJexEnrollment(singleCanvasEnrollment);
    expect(singleSisEnrollment).toEqual(sisEnrollments[0]);
  });
});

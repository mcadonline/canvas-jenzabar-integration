import toSisEnrollmentFromCanvasEnrollment from './toSisEnrollmentFromCanvasEnrollment';

const canvasEnrollments = [
  {
    id: 572,
    user_id: 331,
    course_id: 169,
    type: 'StudentEnrollment',
    created_at: '2019-07-22T17:00:24Z',
    updated_at: '2019-07-22T17:00:24Z',
    course_section_id: 124,
    enrollment_state: 'active',
    role: 'StudentEnrollment',
    sis_account_id: null,
    sis_course_id: 'GWD-6610-20-F19',
    sis_section_id: 'GWD-6610-20-F19',
    section_integration_id: null,
    sis_user_id: '1265947',
  },
  {
    id: 572,
    user_id: 331,
    course_id: 169,
    type: 'StudentEnrollment',
    created_at: '2019-07-22T17:00:24Z',
    updated_at: '2019-07-22T17:00:24Z',
    course_section_id: 124,
    enrollment_state: 'active',
    role: 'StudentEnrollment',
    sis_account_id: null,
    sis_course_id: 'GWD-6610-20-F19',
    sis_section_id: 'GWD-6610-20-F19',
    section_integration_id: null,
    sis_user_id: '1265947',
  },
];

const sisEnrollments = toSisEnrollmentFromCanvasEnrollment(canvasEnrollments);

describe('toSisEnrollmentFromCanvasEnrollment', () => {
  it('creates expected shape', () => {
    expect(sisEnrollments.length).toBe(2);
    sisEnrollments.forEach((sisEnrollment) => {
      expect(Object.keys(sisEnrollment)).toEqual([
        'course_id',
        'section_id',
        'user_id',
        'role',
        'status',
      ]);
    });
  });

  it('sets role to student', () => {
    expect(sisEnrollments.every(e => e.role === 'student')).toBe(true);
  });

  it('has active status', () => {
    expect(sisEnrollments.every(e => e.status === 'active')).toBe(true);
  });

  it('converts a single enrollment', () => {
    const singleCanvasEnrollment = canvasEnrollments[0];
    const singleSisEnrollment = toSisEnrollmentFromCanvasEnrollment(singleCanvasEnrollment);
    expect(singleSisEnrollment).toEqual(sisEnrollments[0]);
  });
});

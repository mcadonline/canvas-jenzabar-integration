import { DateTime } from 'luxon';
import canvas from './index';

describe.skip('canvas Integration Tests', () => {
  describe('canvas.getActiveCourses', () => {
    it('gets a list of courses with future end date', async () => {
      const courses = await canvas.getActiveCourses();
      const first = courses[0];
      expect(courses.length).toBeGreaterThan(3);
      expect(Object.keys(first)).toEqual([
        'id',
        'sis_course_id',
        'course_code',
        'name',
        'status',
        'start_date',
        'end_date',
        'course_format',
        'total_students',
      ]);
      expect(typeof first.id).toBe('number');

      const propsWithPossibleNonTruthyValues = ['course_format', 'total_students'];

      Object.keys(first)
        .filter(key => !propsWithPossibleNonTruthyValues.includes(key))
        .map(key => first[key])
        .forEach(val => expect(val).toBeTruthy());

      expect(DateTime.fromISO(first.end_date) >= DateTime.utc()).toBe(true);
    });
  });

  describe('canvas.getCourses', () => {
    it('gets courses', async () => {
      const courses = await canvas.getCourses();
      const first = courses[0];
      expect(courses.length).toBeGreaterThan(10);
      expect(Object.keys(first)).toEqual([
        'id',
        'sis_course_id',
        'course_code',
        'name',
        'status',
        'start_date',
        'end_date',
        'course_format',
        'total_students',
      ]);
    });
  });

  describe('getUsers', () => {
    it('gets users from canvas', async () => {
      const users = await canvas.getUsers();
      const first = users[0];
      expect(users.length).toBeGreaterThan(10);
      expect(Object.keys(first)).toEqual([
        'id',
        'name',
        'sortable_name',
        'short_name',
        'sis_user_id',
        'login_id',
        'email',
      ]);
    }, 10000);
  });
  // describe('getStudentEnrollment');
  describe('getActiveSections', () => {
    // Currently sections are not assigned to active courses
    // unskip this test after this is fixed
    it.skip('gets sections from all active courses', async () => {
      const [activeCourses, activeSections] = await Promise.all([
        canvas.getActiveCourses(),
        canvas.getActiveSections(),
      ]);

      expect(activeSections.length).toBeGreaterThanOrEqual(activeCourses.length);

      const first = activeSections[0];
      expect(Object.keys(first)).toBe([]);
    }, 15000);
  });
  describe('getStudentEnrollment', () => {
    it('gets student enrollments for each course', async () => {
      const enrollments = await canvas.getStudentEnrollment();
      expect(enrollments.length).toBeGreaterThan(10);
      expect(Object.keys(enrollments[0])).toEqual([
        'sis_user_id',
        'sis_course_id',
        'sis_section_id',
      ]);
    }, 10000);
  });
});

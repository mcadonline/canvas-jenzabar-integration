/**
 * This is an integration test of all of our jex methods. It hits a real
 *  database, so it will be slow.
 */

import jex from './index';

describe('jex integration tests', () => {
  describe('jex.getInstructors', () => {
    it('gets instructors from jex', async () => {
      const instructors = await jex.getInstructors();
      const first = instructors[0];

      expect(Object.keys(first)).toEqual([
        'user_id',
        'login_id',
        'first_name',
        'last_name',
        'email',
        'status',
      ]);

      Object.values(first).forEach(value => expect(value).toBeTruthy());
      expect(typeof first.user_id).toBe('number');
      expect(typeof first.login_id).toBe('number');
      expect(first.user_id).toEqual(first.login_id);
      expect(first.email).toMatch(/@/);
      expect(first.status).toBe('active');
      expect(instructors.length).toBeGreaterThan(10);
    });
  });
  describe('jex.getStudents', () => {
    it('gets students', async () => {
      const students = await jex.getStudents();
      const first = students[0];

      expect(Object.keys(first)).toEqual([
        'user_id',
        'login_id',
        'first_name',
        'last_name',
        'email',
        'status',
      ]);

      Object.values(first).forEach(value => expect(value).toBeTruthy());
      expect(typeof first.user_id).toBe('number');
      expect(typeof first.login_id).toBe('number');
      expect(first.email).toMatch(/@/);

      expect(first.user_id).toEqual(first.login_id);
      expect(first.status).toBe('active');
      expect(students.length).toBeGreaterThan(10);
    });
  });
  describe('jex.getUsers', () => {
    it('gets both students and faculty', async () => {
      const [users, students, faculty] = await Promise.all([
        jex.getUsers,
        jex.getStudents,
        jex.getInstructors,
      ]);
      expect(users.length).toEqual(students.length + faculty.length);
    });
  });

  describe('jex.getActiveCourses', () => {
    it('gets current and future sections', async () => {
      const sections = await jex.getActiveCourses();
      const first = sections[0];
      expect(sections.length).toBeGreaterThan(10);
      expect(Object.keys(first)).toEqual(['courseId', 'parentCourseId']);
    });
  });

  describe('jex.getStudentEnrollment', () => {
    it('gets enrollment for current and future sections', async () => {
      const enrollment = await jex.getStudentEnrollment();
      const first = enrollment[0];
      expect(enrollment.length).toBeGreaterThan(100);
      expect(Object.keys(first)).toEqual(['user_id', 'course_id']);
    });
  });
});

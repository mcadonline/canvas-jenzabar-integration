import { DateTime } from 'luxon';
import jex from '../services/jex';
import jsonToCSV from '../utils/jsonToCSV';

const onlyParentCourses = course => course.courseCode === course.parentCourseCode;

const onlyCoursesThatHaventStarted = course => {
  const startDate = DateTime.fromISO(course.startDate);
  const now = DateTime.local();
  return now < startDate;
};

const toCanvasCsvFormat = course => ({
  course_id: course.id,
  user_id: course.instructor.id,
  role: 'teacher',
  status: 'active',
});

export default async () => {
  const courses = await jex.getActiveCourses();
  // only parent courses should have a course shell

  const upcomingParentCourses = courses
    .filter(onlyParentCourses)
    .filter(onlyCoursesThatHaventStarted);

  const canvasCsvEnrollment = upcomingParentCourses.map(toCanvasCsvFormat);

  const csv = jsonToCSV(canvasCsvEnrollment);
  return csv;
};

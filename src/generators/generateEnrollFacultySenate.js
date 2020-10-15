import { DateTime } from 'luxon';
import jex from '../services/jex';
import jsonToCSV from '../utils/jsonToCSV';

const FACULTY_SENATE_COURSEID = 'FACULTY-SENATE-RESOURCES';

const onlyParentCourses = course => course.courseCode === course.parentCourseCode;

const onlyCoursesThatHaventStarted = currentDateTime => course => {
  if (!currentDateTime) throw Error(`currentDateTime is required`);

  const startDate = DateTime.fromISO(course.startDate);
  const now = DateTime.fromISO(currentDateTime);
  return now < startDate;
};

const toCanvasCsvFormat = course => ({
  section_id: FACULTY_SENATE_COURSEID,
  user_id: course.instructor.id,
  role: 'student',
  status: 'active',
});

export default async ({ currentDateTime = DateTime.local().toISO() } = {}) => {
  const courses = await jex.getActiveCourses();

  // only parent courses should have a course shell
  const upcomingParentCourses = courses
    .filter(onlyParentCourses)
    .filter(onlyCoursesThatHaventStarted(currentDateTime));

  const canvasCsvEnrollment = upcomingParentCourses.map(toCanvasCsvFormat);

  const csv = jsonToCSV(canvasCsvEnrollment);
  return csv;
};

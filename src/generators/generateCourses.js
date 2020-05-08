import { DateTime } from 'luxon';
import jsonToCSV from '../utils/jsonToCSV';
import jex from '../services/jex';

const onlyParentCourses = course => course.courseCode === course.parentCourseCode;

const noCoursesTwoWeeksAfterStartDate = ({ today }) => course => {
  const startDate = DateTime.fromISO(course.startDate);
  const twoWeeksAfterStartDate = startDate.plus({ weeks: 2 });
  const now = today ? DateTime.fromISO(today) : DateTime.local();
  return now < twoWeeksAfterStartDate;
};

const byStartDate = (course1, course2) => {
  const start1 = DateTime.fromISO(course1.startDate);
  const start2 = DateTime.fromISO(course2.startDate);
  return start1 <= start2 ? -1 : 1;
};

const toCanvasCsvFormat = course => ({
  course_id: course.id,
  short_name: course.id,
  long_name: course.name,
  term_id: `${course.year}-${course.term}`,
  status: 'active',
  start_date: course.openDate,
  end_date: course.closeDate,
  blueprint_course_id: 'TEMPLATE-ENHANCEDCOURSE',
});

/**
 * @param today - pretend like this is today's date
 */
export default async ({ today = null }) => {
  const courses = await jex.getActiveCourses();

  // only parent courses should have a course shell
  const canvasCsvCourses = courses
    .filter(noCoursesTwoWeeksAfterStartDate({ today }))
    .filter(onlyParentCourses)
    .sort(byStartDate)
    .map(toCanvasCsvFormat);

  console.log(canvasCsvCourses);

  const csv = jsonToCSV(canvasCsvCourses);
  return csv;
};

import { DateTime } from 'luxon';
import jsonToCSV from '../utils/jsonToCSV';
import jex from '../services/jex';
import canvas from '../services/canvas';

const onlyParentCourses = course => course.courseCode === course.parentCourseCode;

const noCoursesTwoWeeksAfterStartDate = ({ currentDateTime }) => course => {
  const startDate = DateTime.fromISO(course.startDate);
  const twoWeeksAfterStartDate = startDate.plus({ weeks: 2 });
  const now = currentDateTime ? DateTime.fromISO(currentDateTime) : DateTime.local();
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
 * @param opts.currentDateTime - the current datetime in iso format
 */
export default async ({ currentDateTime }) => {
  if (!currentDateTime) throw new Error(`invalid argument currentDateTime: ${currentDateTime}`);
  const [coursesFromJex, coursesFromCanvas] = await Promise.all([
    jex.getActiveCourses(),
    canvas.getCourses(),
  ]);

  const canvasSisCourseIds = coursesFromCanvas.map(c => c.sis_course_id);
  const canvasCourseIdSet = new Set(canvasSisCourseIds);

  const canvasCsvCourses = coursesFromJex
    .filter(noCoursesTwoWeeksAfterStartDate({ currentDateTime }))
    // only parent courses should have a course shell
    .filter(onlyParentCourses)
    // online courses that don't yet exist in canvas
    .filter(jexCourse => !canvasCourseIdSet.has(jexCourse.id))
    .sort(byStartDate)
    .map(toCanvasCsvFormat);

  const csv = jsonToCSV(canvasCsvCourses);
  return csv;
};

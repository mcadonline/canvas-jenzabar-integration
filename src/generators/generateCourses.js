import { DateTime } from 'luxon';
import jsonToCSV from '../utils/jsonToCSV';
import jex from '../services/jex';

const onlyParentCourses = course => course.courseCode === course.parentCourseCode;

const noCoursesTwoWeeksAfterStartDate = course => {
  const startDate = DateTime.fromISO(course.startDate);
  const twoWeeksAfterStartDate = startDate.plus({ weeks: 2 });
  const now = DateTime.local();
  return now < twoWeeksAfterStartDate;
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

export default async () => {
  const courses = await jex.getActiveCourses();

  console.log(courses[0]);

  // only parent courses should have a course shell
  const canvasCsvCourses = courses
    .filter(noCoursesTwoWeeksAfterStartDate)
    .filter(onlyParentCourses)
    .map(toCanvasCsvFormat);

  const csv = jsonToCSV(canvasCsvCourses);
  return csv;
};

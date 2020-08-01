import { intersection, indexBy, keys, equals } from 'ramda';
import { DateTime } from 'luxon';
import jsonToCsv from '../utils/jsonToCSV';
import jex from '../services/jex';
import canvas from '../services/canvas';

/**
 * Converts a course to an object with keys equal to headers of
 * Canvas CSV format.
 *
 * @link https://canvas.instructure.com/doc/api/file.sis_csv.html
 *
 * @param {Object} jexCourse - the course to convert in jex format
 * @param {string} currentDateTimeISO  – current date time. If past the
 * open datetime, then the course will published.
 */
const jexCourseToCanvasCsvFormat = (jexCourse, currentDateTimeISO) => {
  if (!jexCourse) throw Error(`missing required argument jexCourse`);
  if (!currentDateTimeISO) throw Error(`missing required argument currentDateTimeISO`);

  // should this course be published?
  const now = DateTime.fromISO(currentDateTimeISO);
  const openDate = DateTime.fromISO(jexCourse.openDate);
  const shouldBePublished = now >= openDate;

  return {
    course_id: jexCourse.id,
    short_name: jexCourse.id,
    long_name: jexCourse.name,
    // See TODO in canvasApiCourseToCanvasCsvFormat
    // term_id: `${jexCourse.year}-${jexCourse.term}`,
    status: shouldBePublished ? 'published' : 'active',
    start_date: DateTime.fromISO(jexCourse.openDate).toISO(),
    end_date: DateTime.fromISO(jexCourse.closeDate).toISO(),
  };
};

const workflowStateToCanvasCsvStatus = workflowState => {
  switch (workflowState) {
    case 'unpublished':
      return 'active';
    case 'available':
      return 'published';
    case 'completed':
      return 'completed';
    case 'deleted':
      return 'deleted';
    default:
      return workflowState;
  }
};

const canvasApiCourseToCanvasCsvFormat = canvasCourse => {
  if (!canvasCourse) throw Error(`missing required argument: canvasCourse`);

  return {
    course_id: canvasCourse.sis_course_id,
    short_name: canvasCourse.course_code,
    long_name: canvasCourse.name,
    // TODO:
    // need to include[]=term in Canvas API call
    // if we want to get ti term ids.
    // term_id: canvasCourse.term.sis_term_id,
    status: workflowStateToCanvasCsvStatus(canvasCourse.workflow_state),
    start_date: DateTime.fromISO(canvasCourse.start_date).toISO(),
    end_date: DateTime.fromISO(canvasCourse.end_date).toISO(),
  };
};

/**
 * generates a list of canvas courses to update in Canvas CSV SIS upload format,
 * checking name, startDate, endDate, publish state against the SIS.
 *
 * @param {Object} opts - options
 * @param {string} [opt.today=now] - the curent date time in ISO
 * format. Defaults to current datetime.  Used to decide whether the course
 * should be published or not
 *
 * @returns {Object[]} - a list of courses in Canvas CSV format
 */
export default async ({ today = DateTime.local().toISO() } = {}) => {
  const [jexCourses, canvasCourses] = await Promise.all([
    jex.getActiveCourses(),
    canvas.getCourses(),
  ]);

  const jexCoursesIndexedById = indexBy(c => c.id, jexCourses);
  const canvasCoursesIndexedById = indexBy(c => c.sis_course_id, canvasCourses);

  // compare the courseIds in the list of jexCourses with the
  // courseIds in canvasCourses. Get a list of courseIds that
  // appear in both lists. These are the ids of courses to reconcile.
  const courseIdsInBoth = intersection(keys(jexCoursesIndexedById), keys(canvasCoursesIndexedById));

  const coursesToUpdate = courseIdsInBoth
    // .filter(id => id === '2D-3303-20-F20')
    .reduce((acc, courseId) => {
      // get both courses and convert both courses to common format
      const jexCourse = jexCoursesIndexedById[courseId];
      const jexCourseInCsvFormat = jexCourseToCanvasCsvFormat(jexCourse, today);
      // console.log(jexCourse);

      const canvasCourse = canvasCoursesIndexedById[courseId];
      const canvasCourseInCsvFormat = canvasApiCourseToCanvasCsvFormat(canvasCourse);
      // console.log(canvasCourse);

      const isUpToDate = equals(jexCourseInCsvFormat, canvasCourseInCsvFormat);
      // console.log('JEX', JSON.stringify(jexCourseInCsvFormat, ' ', 2));
      // console.log('CANVAS', JSON.stringify(canvasCourseInCsvFormat, ' ', 2));

      return isUpToDate
        ? acc
        : [
            ...acc,
            // jex is our source of truth
            // so this course represents what should be
            jexCourseInCsvFormat,
          ];
    }, []);

  return jsonToCsv(coursesToUpdate);
};

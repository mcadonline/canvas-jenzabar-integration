import { intersection, indexBy, keys, equals } from 'ramda';
import jsonToCsv from '../utils/jsonToCSV.js';
import jex from '../services/jex/index.js';
import canvas from '../services/canvas/index.js';

/**
 * Converts a course to an object with keys equal to headers of
 * Canvas CSV format.
 *
 * @link https://canvas.instructure.com/doc/api/file.sis_csv.html
 *
 * @param {Object} jexCourse - the course to convert in jex format
 */
const jexCourseToCanvasCsvFormat = (jexCourse) => {
  if (!jexCourse) throw Error(`missing required argument jexCourse`);

  return {
    course_id: jexCourse.id,
    short_name: jexCourse.id,
    long_name: jexCourse.name,
    status: 'active',
    start_date: '', // start_date field required for end_date to "take" in SIS Import
    end_date: jexCourse.closeDate,
  };
};

const canvasApiCourseToCanvasCsvFormat = (canvasCourse) => {
  if (!canvasCourse) throw Error(`missing required argument: canvasCourse`);

  return {
    course_id: canvasCourse.sis_course_id,
    short_name: canvasCourse.course_code,
    long_name: canvasCourse.name,
    status: 'active',
    // start_date: DateTime.fromISO(canvasCourse.start_date).toISO(),
    // end_date: DateTime.fromISO(canvasCourse.end_date).toISO(),
  };
};

/**
 * generates a list of canvas courses to update in Canvas CSV SIS upload format,
 * checking name, startDate, endDate, publish state against the SIS.
 * @returns {Object[]} - a list of courses in Canvas CSV format
 */
export default async () => {
  const [jexCourses, canvasCourses] = await Promise.all([
    jex.getActiveCourses(),
    canvas.getCourses(),
  ]);

  const normalizedCourseFromJex = jexCourses.map(jexCourseToCanvasCsvFormat);
  const normalizedCourseFromCanvas = canvasCourses.map(canvasApiCourseToCanvasCsvFormat);

  const jexCoursesIndexedById = indexBy((c) => c.course_id, normalizedCourseFromJex);
  const canvasCoursesIndexedById = indexBy((c) => c.course_id, normalizedCourseFromCanvas);

  // Get a list of courseIds that appear in both lists.
  // These are the ids of courses to reconcile.
  const courseIdsInBoth = intersection(keys(jexCoursesIndexedById), keys(canvasCoursesIndexedById));

  const coursesToUpdate = courseIdsInBoth
    .filter((courseId) => {
      const jexCourse = jexCoursesIndexedById[courseId];
      const canvasCourse = canvasCoursesIndexedById[courseId];

      // include in update list if these aren't equal
      return !equals(jexCourse, canvasCourse);
    })
    .map((courseId) => jexCoursesIndexedById[courseId]);

  return jsonToCsv(coursesToUpdate);
};

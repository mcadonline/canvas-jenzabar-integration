/* eslint-disable camelcase */
import { intersection, indexBy } from 'ramda';
import { DateTime } from 'luxon';
import jsonToCsv from '../utils/jsonToCSV';
import jex from '../services/jex';
import canvas from '../services/canvas';

export default async ({ currentDateTime }) => {
  if (!currentDateTime) throw new Error(`Invalid currentDateTime: ${currentDateTime}`);

  const [jexCourses, canvasCourses] = await Promise.all([
    jex.getActiveCourses(),
    canvas.getCourses(),
  ]);

  // create a lookup for canvasCourses
  const canvasCoursesIndexedById = indexBy(c => c.sis_course_id, canvasCourses);
  const jexCoursesIndexById = indexBy(c => c.id, jexCourses);

  // we only care about checking whether
  // unpublished canvas courses should be published
  const coursesClosedAccordingToCanvas = canvasCourses
    .filter(crs => crs.workflow_state === 'unpublished')
    .map(crs => crs.sis_course_id);

  const courseOpenAccordingToJex = jexCourses
    .filter(crs => DateTime.fromISO(currentDateTime) >= DateTime.fromISO(crs.openDate))
    .map(crs => crs.id);

  // These are the ids of courses to reconcile.
  // Publish courses that are:
  // 1. Open according to Jex
  // 2. Closed according to Canvas
  // 3. at or beyond the Jex open date
  const coursesToPublish = intersection(coursesClosedAccordingToCanvas, courseOpenAccordingToJex)
    .filter(courseId => {
      const { openDate } = jexCoursesIndexById[courseId];
      return DateTime.fromISO(currentDateTime) >= DateTime.fromISO(openDate);
    })
    .map(courseId => canvasCoursesIndexedById[courseId])
    .map(canvasCourse => ({
      course_id: canvasCourse.sis_course_id,
      short_name: canvasCourse.course_code,
      long_name: canvasCourse.name,
      status: 'published',
    }));

  return jsonToCsv(coursesToPublish);
};

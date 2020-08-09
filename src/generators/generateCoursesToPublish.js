/* eslint-disable camelcase */
import { intersection } from 'ramda';
import { DateTime } from 'luxon';
import jsonToCsv from '../utils/jsonToCSV';
import jex from '../services/jex';
import canvas from '../services/canvas';

export default async ({ today = DateTime.local().toISO() } = {}) => {
  const [jexCourses, canvasCourses] = await Promise.all([
    jex.getActiveCourses(),
    canvas.getCourses(),
  ]);

  // we only care about checking whether
  // unpublished canvas courses should be published
  const coursesClosedAccordingToCanvas = canvasCourses
    .filter(crs => crs.workflow_state === 'unpublished')
    .map(crs => crs.sis_course_id);

  const courseOpenAccordingToJex = jexCourses
    .filter(crs => DateTime.fromISO(crs.openDate) >= DateTime.fromISO(today))
    .map(crs => crs.id);

  // These are the ids of courses to reconcile.
  // courses that are BOTH:
  // 1. Open according to Jex
  // 2. Closed according to Canvas
  const coursesToPublish = intersection(
    coursesClosedAccordingToCanvas,
    courseOpenAccordingToJex
  ).map(course_id => ({ course_id }));

  return jsonToCsv(coursesToPublish);
};

/* eslint-disable camelcase */

import canvas from '../services/canvas/index.js';
import jex from '../services/jex/index.js';
import jsonToCSV from '../utils/jsonToCSV.js';
import setMinus from '../utils/setMinus.js';
import toCourseId from '../utils/toCourseId.js';

export default async () => {
  const [activeCanvasCourses, activeCanvasSections, activeJexCourses] = await Promise.all([
    canvas.getActiveCourses(),
    canvas.getActiveSections(),
    jex.getActiveCourses(),
  ]);

  // Active courses in canvas is our
  // source of truth for which courses sections
  // need to be created. These sis_course_ids are
  // the parentCourseIds in jex. That is,
  // any course in jex, which has a sis_course_id
  // equal to the parentCourseId, should have a section
  // in Canvas.

  // create a lookup table for checking if a course
  // exists in canvas
  // TODO: Do we need activeCanvasCourses? Can't we
  // just user activeCanvasSections?
  const activeCanvasCourseLookup = activeCanvasCourses
    .map((c) => c.sis_course_id)
    .reduce(
      (acc, sis_course_id) => ({
        ...acc,
        [sis_course_id]: true,
      }),
      {}
    );

  // run through all the active jex courses
  // only keep the ones where the parentCourseId is in
  // the activeCanvasCourseLookup
  const jexCoursesRunningInCanvas = activeJexCourses.filter((jexCourse) => {
    const { term, parentCourseCode, year } = jexCourse;
    const parentCourseId = toCourseId({ courseCode: parentCourseCode, term, year });
    const isInCanvas = !!activeCanvasCourseLookup[parentCourseId];
    return isInCanvas;
  });

  // to compare these lists, we need to change them
  // to a common format.
  // These sections ARE currently in canvas.
  const sisSectionsInCanvas = canvas.toSisSections(activeCanvasSections);

  // these sections SHOULD be in Canvas as well.
  const sisSectionsInJex = jex.toSisSections(jexCoursesRunningInCanvas);

  // Now let's compare. Which sections SHOULD be in canvas
  // but aren't currently?
  const sectionsToCreateInCanvas = setMinus(sisSectionsInJex, sisSectionsInCanvas);

  return jsonToCSV(sectionsToCreateInCanvas);
};

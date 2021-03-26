// import pMapSeries from 'p-map-series';
import pMap from 'p-map';
import { flatten, pick } from 'ramda';
import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas.js';
import fetchFromCanvas from './fetchFromCanvas.js';

const getSectionsForCourse = (courseId) =>
  fetchFromCanvas(`/courses/sis_course_id:${courseId}/sections`);

export default async () => {
  const activeCourses = await getActiveCoursesFromCanvas();
  const activeSisIds = activeCourses.map((c) => c.sis_course_id);
  const sections = await pMap(activeSisIds, getSectionsForCourse, {
    concurrency: 8,
  });

  const succinctSections = flatten(sections)
    .map(pick(['id', 'name', 'course_id', 'sis_course_id', 'sis_section_id']))
    .filter((s) => !!s.sis_section_id);

  return succinctSections;
};

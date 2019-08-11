/* eslint-disable camelcase */

import canvas from '../services/canvas';
import jex from '../services/jex';
import jsonToCSV from '../utils/jsonToCSV';

export default async () => {
  const activeCanvasSections = await canvas.getActiveSections();

  const canvasSectionsArray = activeCanvasSections.map(s => s.sis_section_id);

  const sectionsToCreate = await jex.getSections(canvasSectionsArray);

  const sections = sectionsToCreate.map(({ courseId, parentCourseId }) => ({
    section_id: courseId,
    course_id: parentCourseId,
    name: courseId,
    status: 'active',
  }));
  return jsonToCSV(sections);
};

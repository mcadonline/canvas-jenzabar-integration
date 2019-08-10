/* eslint-disable camelcase */

import canvas from '../services/canvas';
import jsonToCSV from '../utils/jsonToCSV';

export default async () => {
  const activeCourses = await canvas.getActiveCourses();
  const sections = activeCourses.map(({ course_id }) => ({
    section_id: course_id,
    course_id,
    name: course_id,
    status: 'active',
  }));
  return jsonToCSV(sections);
};

/* eslint-disable camelcase */
const toSisSection = ({ sis_section_id, sis_course_id }) => ({
  section_id: sis_section_id,
  course_id: sis_course_id,
  name: sis_section_id,
  status: 'active',
});

export default (arr) => {
  if (!Array.isArray(arr)) {
    return arr.sis_section_id ? toSisSection(arr) : {};
  }

  return arr.filter(s => !!s.sis_section_id).map(toSisSection);
};

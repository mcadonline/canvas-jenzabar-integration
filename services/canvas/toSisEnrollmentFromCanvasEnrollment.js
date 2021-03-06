/* eslint-disable camelcase */
const toSis = ({ sis_section_id, sis_user_id }) => ({
  section_id: sis_section_id,
  user_id: sis_user_id,
  role: 'student',
  status: 'active',
});

export default (arr) => {
  if (Array.isArray(arr)) return arr.map(toSis);
  return toSis(arr);
};

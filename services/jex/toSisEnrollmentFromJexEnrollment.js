// import toCourseId from '../../utils/toCourseId';

const toSisEnrollment = ({ id, canvasSisSectionId }) => ({
  section_id: canvasSisSectionId,
  user_id: id.toString(),
  role: 'student',
  status: 'active',
});

export default arr => (Array.isArray(arr) ? arr.map(toSisEnrollment) : toSisEnrollment(arr));

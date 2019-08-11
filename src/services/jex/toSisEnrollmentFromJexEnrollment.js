import toCourseId from '../../utils/toCourseId';

const toSisEnrollment = ({
  id, courseCode, parentCourseCode, term, year,
}) => ({
  course_id: toCourseId({ courseCode: parentCourseCode, term, year }),
  section_id: toCourseId({ courseCode, term, year }),
  user_id: id.toString(),
  role: 'student',
  status: 'active',
});

export default arr => (Array.isArray(arr) ? arr.map(toSisEnrollment) : toSisEnrollment(arr));

/* eslint-disable camelcase */
import toCourseId from '../../utils/toCourseId';

const toSisSection = ({
  courseCode, term, year, parentCourseCode,
}) => {
  const section_id = toCourseId({ courseCode, term, year });
  const course_id = toCourseId({ courseCode: parentCourseCode, term, year });
  return {
    section_id,
    course_id,
    name: section_id,
    status: 'active',
  };
};

export default arr => (Array.isArray(arr) ? arr.map(toSisSection) : toSisSection(arr));

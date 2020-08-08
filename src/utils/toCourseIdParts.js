import toTermYearParts from './toTermYearParts';

/**
 * given a Canvas SIS course/section ID String, returns a object with
 * courseIdParts
 */

const toCourseCode = ({ dept, courseNumber, section }) =>
  [dept.padEnd(4, ' '), courseNumber, section].join(' ');

export default str => {
  const [dept, courseNumber, section, termYear, suffix] = str.split(/-/);
  const { term, year } = toTermYearParts(termYear);
  const courseCode = toCourseCode({ dept, courseNumber, section });
  return {
    dept,
    courseNumber,
    courseCode,
    section,
    term,
    year,
    suffix,
  };
};

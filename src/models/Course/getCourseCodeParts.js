/**
 * returns  dept, courseNumber, and section from a
 * jex course id
 * @example
 * getCourseIdParts('IDM  6610 20')
 * // returns { dept: 'IDM', courseNumber: '6610', section: '20' }
 */
export default function getCourseCodeParts(jexCourseCode) {
  const [dept, courseNumber, section] = jexCourseCode.split(/\s+/);
  return { dept, courseNumber, section };
}

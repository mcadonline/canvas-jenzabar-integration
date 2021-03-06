/**
 * converts a jenzabar course object to Bb CourseId
 * @example
 * toCourseId({
 *  courseCode: 'IDM  6610 20',
 *  term: 'SP',
 *  year: 2019
 * });
 * // returns 'IDM-6610-20-W19'
 */

const toShortYear = year => year.toString().slice(-2);

const toShortTerm = term => {
  if (term === 'FA') return 'F';
  if (term === 'SP') return 'W';
  if (term === 'SU') return 'S';
  throw Error(`invalid term: ${term}`);
};

export default function({ courseCode, term, year }) {
  if (!courseCode) {
    throw new Error(`${courseCode} is not a valid courseCode`);
  }

  if (!term) {
    throw new Error(`${term} is not a valid term`);
  }

  if (!year) {
    throw new Error(`${year} is not a valid year`);
  }
  const [dept, courseNumber, section] = courseCode.split(/\s+/);

  return [dept, courseNumber, section, toShortTerm(term) + toShortYear(year)].join('-');
}

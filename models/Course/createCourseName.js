import getCourseCodeParts from './getCourseCodeParts.js';
import getTermName from './getTermName.js';

export default ({
  title,
  courseCode,
  term,
  year,
  instructorFirstName,
  instructorPrefName,
  instructorLastName,
}) => {
  const { section } = getCourseCodeParts(courseCode);
  const firstName = instructorPrefName || instructorFirstName;
  const firstInit = firstName.charAt(0);
  const semester = getTermName(term);
  const faculty = firstInit ? `${firstInit}. ${instructorLastName}` : `${instructorLastName}`;

  return [title, '--', faculty, `(Sect. ${section} - ${semester} ${year})`].join(' ');
};

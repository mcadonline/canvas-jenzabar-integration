import validator from 'validator';
import createValidator from './createValidator';
import toCourseId from '../../utils/toCourseId';
import createCourseName from './createCourseName';
import getSundayBefore from './getSundayBefore';
import getEndOfMonth from './getEndOfMonth';

const isTerm = x => /^(FA|SP|SU)$/.test(x);
const isYear = x => Number.isInteger(x) && x >= 1900;
const isCourseCode = x => /^[A-Z0-9]{1,4}\s+[A-Z0-9]{4} [A-Z0-9]{2}$/.test(x);
const isCourseFormat = x => /^(online|on_campus|blended)$/.test(x);

const validateTitle = createValidator('title', validator.isAscii);
const validateTerm = createValidator('term', isTerm);
const validateYear = createValidator('year', isYear);
const validateDate = createValidator('date', validator.isISO8601);
const validateCourseCode = createValidator('courseCode', isCourseCode);
const validateCourseFormat = createValidator('courseFormat', isCourseFormat);
const validateInstructorId = createValidator('instructorId', x => Number.isInteger(x));

export default jexCourse => {
  const {
    year,
    term,
    courseCode,
    title,
    startDate,
    endDate,
    courseFormat,
    parentCourseCode,
    instructorId,
    instructorFirstName,
    instructorPrefName,
    instructorLastName,
  } = jexCourse;

  validateYear(year);
  validateTerm(term);
  validateCourseCode(courseCode);
  validateTitle(title);
  validateDate(startDate);
  validateDate(endDate);
  validateCourseFormat(courseFormat);
  validateCourseCode(parentCourseCode);
  validateInstructorId(instructorId);

  const courseId = toCourseId({ courseCode, term, year });

  return {
    id: courseId,
    name: createCourseName(jexCourse),
    term,
    year,
    startDate,
    endDate,
    openDate: getSundayBefore(startDate),
    closeDate: getEndOfMonth(endDate),
    courseFormat,
    instructor: {
      firstName: instructorPrefName || instructorFirstName,
      lastName: instructorLastName,
    },
  };
};

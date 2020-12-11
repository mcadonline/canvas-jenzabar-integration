/* eslint-disable camelcase */
import { DateTime } from 'luxon';
import getCoursesFromCanvas from './getCoursesFromCanvas';

const onlyCoursesWithFutureEndDate = ({ end_date }) => {
  if (!end_date) return true;
  const now = DateTime.utc();
  const end = DateTime.fromISO(end_date);
  return now <= end;
};

const onlyCoursesEndingWithTermCode = ({ sis_course_id }) => {
  if (!sis_course_id) return false;
  const regexForTermYear = /-[FWS]\d{2}$/i;
  return regexForTermYear.test(sis_course_id);
};

export default async () => {
  const courses = await getCoursesFromCanvas();
  return courses.filter(c => onlyCoursesEndingWithTermCode(c) && onlyCoursesWithFutureEndDate(c));
};

/* eslint-disable camelcase */
import { DateTime } from 'luxon';
import getCoursesFromCanvas from './getCoursesFromCanvas';

const onlyCoursesWithFutureEndDate = ({ end_date }) => {
  if (!end_date) return true;
  const now = DateTime.utc();
  const end = DateTime.fromISO(end_date);
  return now <= end;
};

const onlyCoursesEndingWithTerm = ({ course_id }) => {
  const regexForTermYear = /-[FWS]\d{2}$/i;
  return regexForTermYear.test(course_id);
};

export default async () => {
  const courses = await getCoursesFromCanvas();
  return courses.filter(onlyCoursesEndingWithTerm).filter(onlyCoursesWithFutureEndDate);
};

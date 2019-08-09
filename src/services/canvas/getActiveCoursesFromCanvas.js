/* eslint-disable camelcase */
import { DateTime } from 'luxon';
import getCoursesFromCanvas from './getCoursesFromCanvas';

const onlyCoursesWithFutureEndDate = ({ end_at }) => {
  if (!end_at) return true;
  const now = DateTime.utc();
  const end = DateTime.fromISO(end_at);
  return now <= end;
};

const onlyCoursesWithSISCourseId = ({ sis_course_id }) => !!sis_course_id;

export default async () => {
  const courses = await getCoursesFromCanvas();
  return courses.filter(onlyCoursesWithSISCourseId).filter(onlyCoursesWithFutureEndDate);
};

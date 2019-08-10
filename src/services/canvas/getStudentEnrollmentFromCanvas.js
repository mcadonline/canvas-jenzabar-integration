import { flatten } from 'ramda';
import pMapSeries from 'p-map-series';
import { DateTime } from 'luxon';
import fetchFromCanvas from './fetchFromCanvas';
import getCoursesFromCanvas from './getCoursesFromCanvas';

const ifIntParseInt = (value) => {
  const parsedInt = Number.parseInt(value, 10);
  return Number.isInteger(parsedInt) ? parsedInt : value;
};

/* eslint-disable camelcase */
const normalize = ({ sis_course_id, sis_user_id }) => ({
  course_id: sis_course_id,
  user_id: ifIntParseInt(sis_user_id),
});
/* eslint-enable camelcase */

const onlyThoseWithCourseAndUserId = x => x.sis_course_id && x.sis_user_id;

async function getStudentEnrollmentForCourse({ id }) {
  const url = `/courses/${id}/enrollments?type[]=StudentEnrollment&state[]=active`;
  try {
    const enrollment = await fetchFromCanvas(url);
    return enrollment.filter(onlyThoseWithCourseAndUserId).map(normalize);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

/* eslint-disable camelcase */
const isActiveCourse = ({
  course_id,
  end_date,
  // status,
  total_students,
}) => {
  const now = DateTime.local();
  const endDate = end_date === null ? null : DateTime.fromISO(end_date);
  return (
    course_id !== null // sis_course_id is defined
    // && status === 'available' // published
    && total_students > 0 // at least one student
    && (endDate === null || now <= endDate) // ends today or later (or not set)
    && /.*-[FWS][0-9]{2}$/.test(course_id) // ends like F18, W18, or S18
    // (and doesn't end with an X)
  );
};
/* eslint-enable camelcase */

export default async () => {
  const allCourses = await getCoursesFromCanvas();

  // get enrollments for active courses only
  // e.g. hasn't ended, has students, etc.
  // see: isActiveCourse() for specifics
  const activeCourses = allCourses.filter(isActiveCourse);

  // running in series to prevent Canvas throttling
  const courseEnrollments = await pMapSeries(activeCourses, getStudentEnrollmentForCourse);

  // Parallel. Could be throttled by Canvas API?
  // const courseEnrollments = await Promise.all(activeCourses.map(getEnrollmentForCourse));

  const allEnrollments = flatten(courseEnrollments);
  return allEnrollments;
};

import { flatten, pick } from 'ramda';
import pMap from 'p-map';
import fetchFromCanvas from './fetchFromCanvas';
import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas';

const onlyThoseWithCourseAndUserId = x => x.sis_course_id && x.sis_user_id;

async function getStudentEnrollmentForCourse({ id }) {
  const url = `/courses/${id}/enrollments?type[]=StudentEnrollment&state[]=active&per_page=100`;
  try {
    const enrollment = await fetchFromCanvas(url);
    return enrollment
      .filter(onlyThoseWithCourseAndUserId)
      .map(pick(['user_id', 'sis_course_id', 'sis_section_id']));
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

export default async () => {
  const activeCourses = await getActiveCoursesFromCanvas();

  // limit concurrency prevent Canvas throttling
  const courseEnrollments = await pMap(activeCourses, getStudentEnrollmentForCourse, {
    concurrency: 8,
  });

  // Parallel. Could be throttled by Canvas API?
  // const courseEnrollments = await Promise.all(activeCourses.map(getEnrollmentForCourse));

  const allEnrollments = flatten(courseEnrollments);
  return allEnrollments;
};

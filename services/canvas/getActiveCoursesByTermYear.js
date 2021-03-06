import getActiveCourses from './getActiveCoursesFromCanvas';
import groupCourseIdsByTermYear from '../../utils/groupCourseIdsByTermYear';

export default async () => {
  const activeCourses = await getActiveCourses();
  const activeCourseIds = activeCourses.map(c => c.sis_course_id);
  return groupCourseIdsByTermYear(activeCourseIds);
};

import getActiveCourses from './getActiveCoursesFromCanvas';
import groupCourseIdsByTermYear from '../../utils/groupCourseIdsByTermYear';

export default async () => {
  const activeCourses = await getActiveCourses();
  const activeCourseIds = activeCourses.map(c => c.course_id);
  return groupCourseIdsByTermYear(activeCourseIds);
};

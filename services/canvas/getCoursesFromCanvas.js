import fetchFromCanvas from './fetchFromCanvas.js';

const { error } = console;

const normalizeCanvasCourseData = ({
  /* eslint-disable camelcase */
  id,
  name,
  start_at,
  end_at,
  course_code,
  sis_course_id,
  course_format,
  workflow_state,
  total_students,
  /* eslint-enable camelcase */
}) => ({
  id,
  sis_course_id,
  course_code,
  name,
  workflow_state,
  start_date: start_at,
  end_date: end_at,
  course_format,
  total_students,
});

export default async () => {
  try {
    const url = '/accounts/1/courses?include[]=total_students&per_page=100';
    const courses = await fetchFromCanvas(url);
    const normalizedCourses = courses.map(normalizeCanvasCourseData);
    return normalizedCourses;
  } catch (err) {
    error(err.message);
    throw err;
  }
};

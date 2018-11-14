import fetch from 'node-fetch';
import settings from '../../settings';

const { error } = console;
const { token, hostname } = settings.canvas;

const normalizeCanvasCourseData = ({
  /* eslint-disable camelcase */
  name,
  start_at,
  end_at,
  course_code,
  sis_course_id,
  course_format,
  workflow_state,
  /* eslint-enable camelcase */
}) => ({
  course_id: sis_course_id,
  short_name: course_code,
  long_name: name,
  status: workflow_state,
  start_date: start_at,
  end_date: end_at,
  course_format,
});

export default async () => {
  const url = `https://${hostname}/api/v1/accounts/1/courses`;
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const payload = await fetch(url, { headers }).then(res => res.json());
    return payload.map(normalizeCanvasCourseData);
  } catch (err) {
    error(err.message);
    throw err;
  }
};

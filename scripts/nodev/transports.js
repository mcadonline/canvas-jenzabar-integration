const student = { id: 1001, firstName: 'Demo', preferredName: 'Demo', lastName: 'Student', mcadEmail: 'student@example.invalid', username: 'demo.student', year: 2026, term: 'FA', courseCode: 'FDN  1111 07', parentCourseCode: 'FDN  1111 07' };
const instructor = { id: 2001, firstName: 'Demo', preferredName: 'Demo', lastName: 'Instructor', mcadEmail: 'instructor@example.invalid', username: 'demo.instructor' };
const course = { year: 2026, term: 'FA', courseCode: 'FDN  1111 07', parentCourseCode: 'FDN  1111 07', title: 'Demo Drawing', startDate: '2026-11-20', endDate: '2099-12-11', courseFormat: 'online', instructorId: 2001, instructorFirstName: 'Demo', instructorPrefName: 'Demo', instructorLastName: 'Instructor' };
const courseId = 'FDN-1111-07-F26';
async function fetch(url, options = {}) {
  const path = new URL(url).pathname;
  console.log(`[nodev] Dummy Canvas ${options.method || 'GET'} ${path}`);
  let payload;
  if (options.method === 'POST' && path.endsWith('/sis_imports')) payload = { id: 9001, workflow_state: 'imported', dummy: true };
  else if (path === '/api/v1/accounts/1/users') payload = [];
  else if (path === '/api/v1/accounts/1/courses') payload = [{ id: 101, sis_course_id: courseId, course_code: courseId, name: 'Demo Drawing', start_at: '2026-11-20', end_at: '2099-12-11', course_format: 'online', workflow_state: 'unpublished', total_students: 1 }];
  else if (/\/courses\/[^/]+\/sections$/.test(path)) payload = [{ id: 301, name: 'Demo Section', course_id: 101, sis_course_id: courseId, sis_section_id: courseId }];
  else if (/\/courses\/[^/]+\/enrollments$/.test(path)) payload = [{ sis_user_id: '9999', sis_course_id: courseId, sis_section_id: courseId }];
  else throw new Error(`Unmocked Canvas request: ${url}`);
  return { json: async () => structuredClone(payload), headers: { get: () => null } };
}
const sql = {
  async connect() {
    console.log('[nodev] Dummy Jenzabar connection');
    return {
      on() {}, close() {},
      request: () => ({ query: async (query) => {
        if (query.includes('from STUDENT_CRS_HIST')) return { recordset: [structuredClone(student)] };
        if (query.includes('as instructorId')) return { recordset: [structuredClone(course), { ...structuredClone(course), courseCode: 'FDN  2222 07', parentCourseCode: 'FDN  2222 07' }, { ...structuredClone(course), courseCode: 'FDN  1111 08' }] };
        if (query.includes('sm.LEAD_INSTRUCTR_ID = nm.id_num')) return { recordset: [structuredClone(instructor)] };
        throw new Error('Unmocked Jenzabar query');
      } }),
    };
  },
};
export default import.meta.url.includes('transport=mssql') ? sql : fetch;

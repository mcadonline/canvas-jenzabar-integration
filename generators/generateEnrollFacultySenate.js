import jex from '../services/jex/index.js';
import jsonToCSV from '../utils/jsonToCSV.js';

const FACULTY_SENATE_COURSEID = 'FACULTY-SENATE-RESOURCES';

const toCanvasCsvFormat = (instructorId) => ({
  section_id: FACULTY_SENATE_COURSEID,
  user_id: instructorId,
  role: 'student',
  status: 'active',
});

export default async () => {
  const courses = await jex.getActiveCourses();

  const setOfFacultyIds = new Set();
  courses.forEach(({ instructor }) => setOfFacultyIds.add(instructor.id));
  const canvasCsvEnrollment = Array.from(setOfFacultyIds).map(toCanvasCsvFormat);

  const csv = jsonToCSV(canvasCsvEnrollment);
  return csv;
};

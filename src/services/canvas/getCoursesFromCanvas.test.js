import fetch from 'node-fetch';
import getCourses from './getCoursesFromCanvas';

jest.mock('node-fetch');

const mockCoursesFromCanvasApi = [
  {
    id: 1,
    name: 'Workshop: Growing with Canvas',
    start_at: '2018-11-09T23:00:00Z',
    end_at: null,
    course_code: 'WORKSHOP-GROWINGWITHCANVAS-20-F18',
    sis_course_id: 'WORKSHOP-GROWINGWITHCANVAS-20-F18',
    sis_import_id: null,
    workflow_state: 'available',
    course_format: 'blended',
  },
  {
    id: 2,
    name: 'Web Development: HTML and CSS',
    start_at: '2019-01-20T06:00:00Z',
    end_at: '2019-05-31T23:59:59Z',
    course_code: 'GWD-6610-20-W19',
    sis_course_id: 'GWD-6610-20-W19',
    sis_import_id: null,
    workflow_state: 'available',
    course_format: 'online',
  },
];

describe('canvas.getCourses', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: () => mockCoursesFromCanvasApi,
      headers: {
        get: () => undefined,
      },
    });
  });

  it('gets a list of all courses in canvas', async () => {
    const courses = await getCourses();
    expect(Object.keys(courses[0])).toEqual([
      'id', // canvas id (used for enrollment queries)
      'course_id', // sis course id
      'short_name', // course id
      'long_name', // course name
      'status', // active, deleted, completed
      'start_date',
      'end_date',
      'course_format', // online, on_campus, blended
      'total_students', // total active students
    ]);
  });
});

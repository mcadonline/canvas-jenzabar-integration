// import generateCourseUpdates from './generateCourseUpdates';
// import jex from '../services/jex';

describe('generateCourses', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  // it('matches CanvasCSV format', async () => {
  //   const csv = await generateCourseUpdates();
  //   const firstLine = csv.split('\n')[0];
  //   expect(firstLine).toMatchInlineSnapshot(`
  //     "course_id,short_name,long_name,term_id,status,start_date,end_date
  //     "
  //   `);
  // });

  it.todo('lists courses with names that need updating');
  it.todo('lists courses with open dates that need updating');
  it.todo('it lists courses with end dates that need updating');
});

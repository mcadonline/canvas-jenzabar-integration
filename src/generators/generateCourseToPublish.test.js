import jex from '../services/jex';
import canvas from '../services/canvas';
import generateCoursesToPublish from './generateCoursesToPublish';

describe('courseToPublish', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('lists sis_course_id of courses to publish', async () => {
    const now = '2020-01-01T00:00:00.000-06:00';

    // course is open according to jex
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        openDate: '2020-01-01T00:00:00.000-06:00',
      },
    ]);

    // course is unpublished in Canvas
    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        sis_course_id: 'FDN-1111-07-F20',
        workflow_state: 'unpublished', // should be published
      },
    ]);

    const csv = await generateCoursesToPublish({ today: now });
    expect(csv).toMatchInlineSnapshot(`
      "course_id
      FDN-1111-07-F20"
    `);
  });

  it('does not list courses already open in Jex and published in Canvas', async () => {
    const now = '2020-01-01T00:00:00.000-06:00';

    // course is OPEN according to jex
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        openDate: '2020-01-01T00:00:00.000-06:00',
      },
    ]);

    // course is PUBLISHED in Canvas
    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        sis_course_id: 'FDN-1111-07-F20',
        workflow_state: 'available',
      },
    ]);

    const csv = await generateCoursesToPublish({ today: now });
    expect(csv).toMatchInlineSnapshot(`""`);
  });

  it('ignores courses published in Canvas but arent yet open according to Jex', async () => {
    const now = '2020-01-01T00:00:00.000-06:00';

    // This course should not yet be open
    // but we'll ignore it. Some users want to publish
    // their courses early. We should not try to unpublish them.
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        openDate: '2020-02-02T00:00:00.000-06:00',
      },
    ]);

    // course is PUBLISHED in Canvas
    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        sis_course_id: 'FDN-1111-07-F20',
        workflow_state: 'available',
      },
    ]);

    const csv = await generateCoursesToPublish({ today: now });
    expect(csv).toMatchInlineSnapshot(`""`);
  });
});

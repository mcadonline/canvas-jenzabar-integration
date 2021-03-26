import { jest } from '@jest/globals';
import jex from '../services/jex';
import canvas from '../services/canvas';
import generateCoursesToPublish from './generateCoursesToPublish';

describe('courseToPublish', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('includes unpublished canvas courses after open date', async () => {
    // course is open according to jex
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        name: 'Foundation: 2D',
        openDate: '2020-01-01T00:00:00.000-06:00',
      },
    ]);

    // course is unpublished in Canvas
    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        sis_course_id: 'FDN-1111-07-F20',
        course_code: 'FDN-1111-07-F20',
        name: 'Foundation: 2D',
        workflow_state: 'unpublished', // should be published
      },
    ]);

    const openDateTime = '2020-01-01T00:00:00.000-06:00';
    const csv = await generateCoursesToPublish({
      currentDateTime: openDateTime,
    });
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status
      FDN-1111-07-F20,FDN-1111-07-F20,Foundation: 2D,published"
    `);

    const afterOpenDateTime = '2020-01-01T01:00:00.000-06:00';
    const csv2 = await generateCoursesToPublish({
      currentDateTime: afterOpenDateTime,
    });
    expect(csv2).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status
      FDN-1111-07-F20,FDN-1111-07-F20,Foundation: 2D,published"
    `);
  });

  it('does not publish courses before open date', async () => {
    // course is open according to jex
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        name: 'Foundation: 2D',
        openDate: '2020-01-02T00:00:00.000-06:00',
      },
    ]);

    // course is unpublished in Canvas
    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        sis_course_id: 'FDN-1111-07-F20',
        course_code: 'FDN-1111-07-F20',
        name: 'Foundation: 2D',
        workflow_state: 'unpublished', // should be published
      },
    ]);

    const csv = await generateCoursesToPublish({
      currentDateTime: '2020-01-01T00:00:00.000-06:00',
    });
    expect(csv).toMatchInlineSnapshot(`""`);
  });

  it('does not list courses already open in Jex and published in Canvas', async () => {
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        name: 'Foundation: 2D',
        openDate: '2020-01-01T00:00:00.000-06:00',
      },
    ]);

    // course is unpublished in Canvas
    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        sis_course_id: 'FDN-1111-07-F20',
        course_code: 'FDN-1111-07-F20',
        name: 'Foundation: 2D',
        workflow_state: 'published',
      },
    ]);

    const csv = await generateCoursesToPublish({
      currentDateTime: '2020-01-01T00:00:00.000-06:00',
    });
    expect(csv).toMatchInlineSnapshot(`""`);
  });

  it('ignores courses published in Canvas but arent yet open according to Jex', async () => {
    // This course should not yet be open
    // but we'll ignore it. Some users want to publish
    // their courses early. We should not try to unpublish them.
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        name: 'Foundation: 2D',
        openDate: '2020-02-02T00:00:00.000-06:00',
      },
    ]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        sis_course_id: 'FDN-1111-07-F20',
        course_code: 'FDN-1111-07-F20',
        name: 'Foundation: 2D',
        workflow_state: 'published',
      },
    ]);

    const csv = await generateCoursesToPublish({
      currentDateTime: '2020-01-01T00:00:00.000-06:00',
    });
    expect(csv).toMatchInlineSnapshot(`""`);
  });

  it('only updates the course publish state (not name or course code)', async () => {
    jest.spyOn(jex, 'getActiveCourses');
    jex.getActiveCourses.mockResolvedValue([
      {
        id: 'FDN-1111-07-F20',
        name: 'Jex Name',
        openDate: '2020-01-01T00:00:00.000-06:00',
      },
    ]);

    jest.spyOn(canvas, 'getCourses');
    canvas.getCourses.mockResolvedValue([
      {
        sis_course_id: 'FDN-1111-07-F20',
        course_code: 'CanvasCourseCode',
        name: 'Canvas Name',
        workflow_state: 'unpublished',
      },
    ]);

    const csv = await generateCoursesToPublish({
      currentDateTime: '2020-01-01T00:00:00.000-06:00',
    });
    expect(csv).toMatchInlineSnapshot(`
      "course_id,short_name,long_name,status
      FDN-1111-07-F20,CanvasCourseCode,Canvas Name,published"
    `);
  });
});

import fromJex from './fromJex';

const jexCourse = {
  year: 2019,
  term: 'FA',
  courseCode: 'GWD  6610 20',
  title: 'Web Development: HTML and CSS',
  startDate: '2019-09-01',
  endDate: '2019-12-15',
  courseFormat: 'online',
  parentCourseCode: 'GWD  6610 20',
  instructorId: 123,
  instructorFirstName: 'James',
  instructorPrefName: null,
  instructorLastName: 'Johnson',
};

describe('fromJex', () => {
  it('creates a course object', () => {
    const course = fromJex(jexCourse);
    expect(course).toMatchInlineSnapshot(`
      Object {
        "closeDate": "2019-12-31T23:59:59.000-06:00",
        "courseCode": "GWD  6610 20",
        "courseFormat": "online",
        "endDate": "2019-12-15",
        "id": "GWD-6610-20-F19",
        "instructor": Object {
          "firstName": "James",
          "id": 123,
          "lastName": "Johnson",
        },
        "name": "Web Development: HTML and CSS -- J. Johnson (Sect. 20 - Fall 2019)",
        "openDate": "2019-08-25T00:00:00.000-05:00",
        "parentCourseCode": "GWD  6610 20",
        "startDate": "2019-09-01",
        "term": "FA",
        "year": 2019,
      }
    `);
  });

  it('requires valid courseCode', () => {
    const invalidCourse = {
      ...jexCourse,
      courseCode: undefined,
    };
    expect(() => fromJex(invalidCourse)).toThrowErrorMatchingInlineSnapshot(
      `"courseCode undefined is not a valid course courseCode"`
    );
  });

  it('requires valid title', () => {
    expect(() =>
      fromJex({
        ...jexCourse,
        title: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(`"title undefined is not a valid course title"`);
  });

  it('requires valid term (FA,SP,SU)', () => {
    expect(() =>
      fromJex({
        ...jexCourse,
        term: 'XX',
      })
    ).toThrowErrorMatchingInlineSnapshot(`"term \\"XX\\" is not a valid course term"`);
  });

  it('requires valid year (number)', () => {
    expect(() =>
      fromJex({
        ...jexCourse,
        year: '2019',
      })
    ).toThrowErrorMatchingInlineSnapshot(`"year \\"2019\\" is not a valid course year"`);
  });

  it('requires ISO start date', () => {
    expect(() =>
      fromJex({
        ...jexCourse,
        startDate: '0-0-0',
      })
    ).toThrowErrorMatchingInlineSnapshot(`"date \\"0-0-0\\" is not a valid course date"`);
  });

  it('requires ISO end date', () => {
    expect(() =>
      fromJex({
        ...jexCourse,
        endDate: null,
      })
    ).toThrowErrorMatchingInlineSnapshot(`"date null is not a valid course date"`);
  });

  it('requires courseFormat', () => {
    const courseWithoutIsOnline = { ...jexCourse };
    delete courseWithoutIsOnline.courseFormat;

    expect(() => fromJex(courseWithoutIsOnline)).toThrowErrorMatchingInlineSnapshot(
      `"courseFormat undefined is not a valid course courseFormat"`
    );
  });
});

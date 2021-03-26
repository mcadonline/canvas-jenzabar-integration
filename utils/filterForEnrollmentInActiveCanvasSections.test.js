import filterForEnrollmentInActiveCanvasSections from './filterForEnrollmentInActiveCanvasSections';

describe('filterForEnrollmentInActiveCanvasSections', () => {
  it('filters for enrollment in active canvas sections', async () => {
    // SETUP
    const jexEnrollment = [
      // in active Canvas section
      {
        id: 1,
        firstName: 'John',
        preferredName: null,
        lastName: 'Doe',
        mcadEmail: 'jdoe@mcad.edu',
        username: 'jdoe',
        courseCode: 'AH   1234 01',
        parentCourseCode: 'AH   1234 01',
        term: 'SU',
        year: 2020,
      },
      // not in active Canvas section
      {
        id: 1,
        firstName: 'John',
        preferredName: null,
        lastName: 'Doe',
        mcadEmail: 'jdoe@mcad.edu',
        username: 'jdoe',
        courseCode: 'CE   9999 99',
        parentCourseCode: 'CE   9999 99',
        term: 'SU',
        year: 2020,
      },
    ];
    const activeCanvasSections = [
      {
        id: 44,
        name: 'AH-1234-01-S20',
        course_id: 444,
        sis_course_id: 'AH-1234-01-S20',
        sis_section_id: 'AH-1234-01-S20',
      },
    ];

    const enrollment = filterForEnrollmentInActiveCanvasSections({
      activeCanvasSections,
      jexEnrollment,
    });

    expect(enrollment).toMatchInlineSnapshot(`
      Array [
        Object {
          "canvasSisSectionId": "AH-1234-01-S20",
          "courseCode": "AH   1234 01",
          "firstName": "John",
          "id": 1,
          "lastName": "Doe",
          "mcadEmail": "jdoe@mcad.edu",
          "parentCourseCode": "AH   1234 01",
          "preferredName": null,
          "term": "SU",
          "username": "jdoe",
          "year": 2020,
        },
      ]
    `);
  });
  it('includes enrollees in Canvas sections with sis_section_ids with suffix `AH-1234-01-S20-WHATEVER`', () => {
    // SETUP
    const jexEnrollment = [
      // in active Canvas section
      {
        id: 1,
        firstName: 'John',
        preferredName: null,
        lastName: 'Doe',
        mcadEmail: 'jdoe@mcad.edu',
        username: 'jdoe',
        courseCode: 'AH   1234 01',
        parentCourseCode: 'AH   1234 01',
        term: 'SU',
        year: 2020,
      },
    ];
    const activeCanvasSections = [
      {
        id: 44,
        name: 'AH-1234-01-S20',
        course_id: 444,
        sis_course_id: 'AH-1234-01-S20',
        sis_section_id: 'AH-1234-01-S20',
      },
      {
        id: 445,
        name: 'ANOTHER-COURSE',
        course_id: 444,
        sis_course_id: 'ANOTHER-COURSE',
        sis_section_id: 'AH-1234-01-S20-WHATEVER',
      },
    ];

    const enrollment = filterForEnrollmentInActiveCanvasSections({
      activeCanvasSections,
      jexEnrollment,
    });

    expect(enrollment).toMatchInlineSnapshot(`
      Array [
        Object {
          "canvasSisSectionId": "AH-1234-01-S20",
          "courseCode": "AH   1234 01",
          "firstName": "John",
          "id": 1,
          "lastName": "Doe",
          "mcadEmail": "jdoe@mcad.edu",
          "parentCourseCode": "AH   1234 01",
          "preferredName": null,
          "term": "SU",
          "username": "jdoe",
          "year": 2020,
        },
        Object {
          "canvasSisSectionId": "AH-1234-01-S20-WHATEVER",
          "courseCode": "AH   1234 01",
          "firstName": "John",
          "id": 1,
          "lastName": "Doe",
          "mcadEmail": "jdoe@mcad.edu",
          "parentCourseCode": "AH   1234 01",
          "preferredName": null,
          "term": "SU",
          "username": "jdoe",
          "year": 2020,
        },
      ]
    `);
  });
});

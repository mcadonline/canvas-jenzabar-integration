import Course from './Course';

const jexCourse = {
  id: 'GWD-6610-20-F19',
  name: 'Web Development',
  term: 'FA',
  year: 2019,
  startDate: '2019-09-01',
  endDate: '2019-12-31',
  isOnline: true,
};

describe('Course', () => {
  describe('fromJex', () => {
    it('creates a course object', () => {
      const course = Course.fromJex(jexCourse);
      expect(course).toEqual(jexCourse);
    });
    it('requires valid id', () => {
      const invalidCourse = {
        ...jexCourse,
        id: undefined,
      };
      expect(() => Course.fromJex(invalidCourse)).toThrowErrorMatchingInlineSnapshot(
        `"id undefined is not a valid course id"`
      );
    });
    it('rejects numerical ids', () => {
      expect(() =>
        Course.fromJex({
          ...jexCourse,
          id: 1,
        })
      ).toThrowErrorMatchingInlineSnapshot(`"id 1 is not a valid course id"`);
    });
    it('requires valid name', () => {
      expect(() =>
        Course.fromJex({
          ...jexCourse,
          name: undefined,
        })
      ).toThrowErrorMatchingInlineSnapshot(`"name undefined is not a valid course name"`);
    });
    it('requires valid term (FA,SP,SU)', () => {
      expect(() =>
        Course.fromJex({
          ...jexCourse,
          term: 'XX',
        })
      ).toThrowErrorMatchingInlineSnapshot(`"term \\"XX\\" is not a valid course term"`);
    });
    it('requires valid year (number)', () => {
      expect(() =>
        Course.fromJex({
          ...jexCourse,
          year: '2019',
        })
      ).toThrowErrorMatchingInlineSnapshot(`"year \\"2019\\" is not a valid course year"`);
    });
    it('requires ISO start date', () => {
      expect(() =>
        Course.fromJex({
          ...jexCourse,
          startDate: '0-0-0',
        })
      ).toThrowErrorMatchingInlineSnapshot(`"date \\"0-0-0\\" is not a valid course date"`);
    });
    it('requires ISO end date', () => {
      expect(() =>
        Course.fromJex({
          ...jexCourse,
          endDate: null,
        })
      ).toThrowErrorMatchingInlineSnapshot(`"date null is not a valid course date"`);
    });
    it('requires isOnline', () => {
      const courseWithoutIsOnline = { ...jexCourse };
      delete courseWithoutIsOnline.isOnline;

      expect(() => Course.fromJex(courseWithoutIsOnline)).toThrowErrorMatchingInlineSnapshot(
        `"isOnline undefined is not a valid course isOnline"`
      );
    });
  });

  describe('fromCanvasAPI', () => {
    it.todo('creates a course from CanvasAPI course data');
  });

  describe('fromJex', () => {
    it.todo('creates a course from Jex data');
  });

  describe('toCanvasCSVCourse', () => {
    it.todo('returns a course with property names for the canvas SIS import');
  });

  describe('equals', () => {
    it.todo(
      'compares two courses, true if matching id, name, term, year, startDate, endDate, and isOnline'
    );
  });
});

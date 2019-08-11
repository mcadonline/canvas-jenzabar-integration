import canvas from '../services/canvas';
import jex from '../services/jex';
import generateSectionsForActiveCourses from './generateSectionsForActiveCourses';

jest.mock('../services/canvas', () => ({
  getActiveSections: jest.fn(),
}));

jest.mock('../services/jex', () => ({
  getSections: jest.fn(),
}));

describe('generateSectionsForActiveCourses', () => {
  it('creates a CSV with a section_id === course_id', async () => {
    canvas.getActiveSections.mockResolvedValue([
      { course_id: 'GWD-6610-20-F19' },
      { course_id: 'AH-3862-01-F19' },
    ]);

    jex.getSections.mockResolvedValue([
      {
        courseId: 'GWD-6610-20-F19',
        parentCourseId: 'GWD-6610-20-F19',
      },
      {
        courseId: 'AH-3862-01-F19',
        parentCourseId: 'AH-3862-01-F19',
      },
      {
        courseId: 'HS-3862-01-F19',
        parentCourseId: 'AH-3862-01-F19',
      },
    ]);

    // each course should have at least one section where section_id === course_id
    const expected = [
      '"section_id","course_id","name","status"',
      '"GWD-6610-20-F19","GWD-6610-20-F19","GWD-6610-20-F19","active"',
      '"AH-3862-01-F19","AH-3862-01-F19","AH-3862-01-F19","active"',
      '"HS-3862-01-F19","AH-3862-01-F19","HS-3862-01-F19","active"',
    ].join('\n');
    const results = await generateSectionsForActiveCourses();
    expect(results).toEqual(expected);
  });
});

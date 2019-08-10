import canvas from '../services/canvas';
import generateSectionsForActiveCourses from './generateSectionsForActiveCourses';

jest.mock('../services/canvas', () => ({
  getActiveCourses: jest.fn(),
}));

describe('generateSectionsForActiveCourses', () => {
  it('creates a CSV with a section_id === course_id', async () => {
    canvas.getActiveCourses.mockResolvedValue([
      { course_id: 'GWD-6610-20-F19' },
      { course_id: 'DEPT-1234-01-F19' },
    ]);

    // each course should have at least one section where section_id === course_id
    const expected = [
      '"section_id","course_id","name","status"',
      '"GWD-6610-20-F19","GWD-6610-20-F19","GWD-6610-20-F19","active"',
      '"DEPT-1234-01-F19","DEPT-1234-01-F19","DEPT-1234-01-F19","active"',
    ].join('\n');
    const results = await generateSectionsForActiveCourses();
    expect(results).toEqual(expected);
  });
});

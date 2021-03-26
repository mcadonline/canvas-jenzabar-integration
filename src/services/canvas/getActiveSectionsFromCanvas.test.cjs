import getActiveCoursesFromCanvas from './getActiveCoursesFromCanvas';
import fetchFromCanvas from './fetchFromCanvas';
import getActiveSectionsFromCanvas from './getActiveSectionsFromCanvas';

jest.mock('./getActiveCoursesFromCanvas', () => jest.fn());
jest.mock('./fetchFromCanvas', () => jest.fn());

describe('getActiveSectionsFromCanvas', () => {
  it('includes all sections for each course in Canvas', async () => {
    const mockSection = {
      id: 155,
      name: 'GWD-6610-20-F19',
      sis_course_id: 'GWD-6610-20-F19',
      sis_section_id: 'GWD-6610-20-F19',
    };
    const mockCourse = {
      id: 1,
      sis_course_id: 'GWD-6610-20-F19',
    };
    getActiveCoursesFromCanvas.mockResolvedValue([mockCourse]);
    fetchFromCanvas.mockResolvedValue([mockSection]);

    const activeSections = await getActiveSectionsFromCanvas();

    expect(getActiveCoursesFromCanvas).toBeCalled();
    expect(fetchFromCanvas).toBeCalledWith('/courses/sis_course_id:GWD-6610-20-F19/sections');

    const gwd6610 = activeSections.filter((s) => s.sis_course_id === 'GWD-6610-20-F19');
    expect(gwd6610).toEqual([mockSection]);
  });
  it('should filter out sections with null sis_section_ids', async () => {
    const mockSection = {
      id: 155,
      name: 'GWD-6610-20-F19',
      sis_course_id: 'GWD-6610-20-F19',
      sis_section_id: null,
    };
    const mockCourse = {
      id: 1,
      course_id: 'GWD-6610-20-F19',
    };
    getActiveCoursesFromCanvas.mockResolvedValue([mockCourse]);
    fetchFromCanvas.mockResolvedValue([mockSection]);

    const activeSections = await getActiveSectionsFromCanvas();

    expect(activeSections).toEqual([]);
  });
});

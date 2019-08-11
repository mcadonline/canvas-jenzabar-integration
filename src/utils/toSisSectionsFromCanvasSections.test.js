import toSisSectionsFromCanvasSections from './toSisSectionsFromCanvasSections';

const canvasSections = [
  {
    id: 128,
    course_id: 175,
    name: 'AH-3862-01-F19',
    start_at: null,
    end_at: null,
    created_at: '2019-08-07T14:57:07Z',
    sis_section_id: 'AH-3862-01-F19',
    sis_course_id: 'AH-3862-01-F19',
  },
  {
    id: 129,
    course_id: 175,
    name: 'HS-3862-01-F19',
    start_at: null,
    end_at: null,
    created_at: '2019-08-08T15:19:20Z',
    sis_section_id: 'HS-3862-01-F19',
    sis_course_id: 'AH-3862-01-F19',
  },
  {
    id: 129,
    course_id: 175,
    name: 'Bauhaus Design -- G. Gasterland-Gustafsson (Sect. 01 - Fall 2019)',
    start_at: null,
    end_at: null,
    created_at: '2019-08-08T15:19:20Z',
    sis_section_id: null,
    sis_course_id: 'AH-3862-01-F19',
  },
];

const sisSections = toSisSectionsFromCanvasSections(canvasSections);

describe('toSisSectionsFromCanvasSections', () => {
  it('includes the correct properties', () => {
    sisSections.forEach(s => expect(Object.keys(s)).toEqual(['section_id', 'course_id', 'name', 'status']));
  });
  it('should ignore sections where no sis_section_id is set', () => {
    expect(sisSections.filter(s => s.section_id === null)).toEqual([]);
  });

  it('sets section name to be the section_id', () => {
    sisSections.forEach(s => expect(s.name === s.section_id));
  });

  it('sets status as active', () => {
    sisSections.forEach(s => expect(s.status === 'active'));
  });

  it('can convert a single section', () => {
    const singleCanvasSection = canvasSections[0];
    const singleSisSection = toSisSectionsFromCanvasSections(singleCanvasSection);
    expect(singleSisSection).toEqual(sisSections[0]);
  });
});

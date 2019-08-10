import groupCourseIdsByTermYear from './groupCourseIdsByTermYear';

describe('courseIdsToTermDict', () => {
  it('takes a list of SIS course ids and groups course codes by jexTermYear', () => {
    const sisCourseIds = [
      'IDM-6610-20-F19',
      'DEPT-1234-01-F19',
      'AH-1701-01-W20',
      'HS-7000-02-S20',
    ];
    expect(groupCourseIdsByTermYear(sisCourseIds)).toEqual([
      {
        term: 'FA',
        year: 2019,
        sections: ['IDM  6610 20', 'DEPT 1234 01'],
      },
      {
        term: 'SP',
        year: 2020,
        sections: ['AH   1701 01'],
      },
      {
        term: 'SU',
        year: 2020,
        sections: ['HS   7000 02'],
      },
    ]);
  });
});

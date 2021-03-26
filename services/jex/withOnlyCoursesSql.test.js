import withOnlyCoursesSql from './withOnlyCoursesSql';

const baseQuery = `
  select id, crs_cde, term, year, firstName, lastName
  from student_crs_hist sch
  where term >= 2001
`;

describe('withOnlyCoursesSql', () => {
  it('adds sql to a baseQuery which only allows given course', () => {
    const courses = [{ term: 'FA', year: 2019, sections: ['IDM  6610 20'] }];
    const expected = `
    select id, crs_cde, term, year, firstName, lastName
    from student_crs_hist sch
    where term >= 2001
    and
    ((
      sch.crs_cde in ('IDM 6610 20')
      and sch.trm_cde = 'FA'
      and sch.yr_cde = '2019'
    ))`;
    const sql = withOnlyCoursesSql({ baseQuery, sectionTable: 'sch', courses });
    // ignore whitespace when comparing sql
    expect(sql.replace(/\s+/g, '')).toBe(expected.replace(/\s+/g, ''));
  });

  it('adds sql for multiple courses in a given term', () => {
    const courses = [{ term: 'FA', year: 2019, sections: ['IDM  6610 20', 'IDM  6611 20'] }];
    const expected = `
      select id, crs_cde, term, year, firstName, lastName
      from student_crs_hist sch
      where term >= 2001
      and
      ((
        sch.crs_cde in ('IDM  6610 20', 'IDM  6611 20')
        and sch.trm_cde = 'FA'
        and sch.yr_cde = '2019'
      ))`;
    const sql = withOnlyCoursesSql({ baseQuery, sectionTable: 'sch', courses });
    // ignore whitespace when comparing sql
    expect(sql.replace(/\s+/g, '')).toBe(expected.replace(/\s+/g, ''));
  });

  it('converts year to jexYear', () => {
    const courses = [{ term: 'SP', year: 2020, sections: ['IDM  6610 20'] }];
    const expected = `
    select id, crs_cde, term, year, firstName, lastName
    from student_crs_hist sch
    where term >= 2001
    and
    ((
      sch.crs_cde in ('IDM 6610 20')
      and sch.trm_cde = 'SP'
      and sch.yr_cde = '2019'
    ))`;
    const sql = withOnlyCoursesSql({ baseQuery, sectionTable: 'sch', courses });
    // ignore whitespace when comparing sql
    expect(sql.replace(/\s+/g, '')).toBe(expected.replace(/\s+/g, ''));
  });

  it('adds sql for multiple terms', () => {
    const courses = [
      { term: 'FA', year: 2019, sections: ['IDM  6610 20', 'IDM  6611 20'] },
      { term: 'SP', year: 2020, sections: ['DEPT 1234 01', 'AH   1702 02'] },
    ];
    const expected = `
      select id, crs_cde, term, year, firstName, lastName
      from student_crs_hist sch
      where term >= 2001
      and
      (
        (
          sch.crs_cde in ('IDM  6610 20', 'IDM  6611 20')
          and sch.trm_cde = 'FA'
          and sch.yr_cde = '2019'
        ) or (
          sch.crs_cde in ('DEPT 1234 01', 'AH   1702 02')
          and sch.trm_cde = 'SP'
          and sch.yr_cde = '2019'
        )
      )`;
    const sql = withOnlyCoursesSql({ baseQuery, sectionTable: 'sch', courses });
    // ignore whitespace when comparing sql
    expect(sql.replace(/\s+/g, '')).toBe(expected.replace(/\s+/g, ''));
  });
});

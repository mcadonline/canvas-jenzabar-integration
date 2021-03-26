import jex from './jexService';

describe('jex service', () => {
  describe('.query', () => {
    it('queries JEX for a list of records', async () => {
      const sql = `
        select 
        cast(yr_cde as int) as academicYear
        , trm_cde as term
        , rtrim(crs_cde) as courseCode
        , sm.first_begin_dte as startDate
        from section_master sm
        where crs_cde = 'IDM  6611 20'
          and yr_cde = '2015'
      `;

      const records = await jex.query(sql);
      await jex.close();
      expect(records.length).toBe(2);
      expect(records[0]).toEqual({
        academicYear: 2015,
        term: 'SP',
        courseCode: 'IDM  6611 20',
        startDate: new Date('2016-01-19T06:00:00.000Z'),
      });
    });
  });
});

const sqlQuery = `
  declare @today datetime;
  set @today = getdate();

  select distinct rtrim(crs_cde) as courseCode
    , trm_cde as term
    , year =
      CASE trm_cde
        WHEN 'FA' THEN yr_cde
        ELSE yr_cde + 1
      END
    , rtrim(x_listed_parnt_crs) as parentCourseCode
  from SECTION_MASTER sm
  where sm.LAST_END_DTE >= @today
`;

export default jexService => async () => {
  // get ALL sections in Jex which end after today
  const recordset = await jexService.query(sqlQuery);
  return recordset;
};

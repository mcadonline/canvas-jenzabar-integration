import toCourseId from '../../utils/toCourseId';

const baseSqlQuery = `
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

// converts jex record into Canvas SIS ID
function normalize(record) {
  const {
    courseCode, term, year, parentCourseCode,
  } = record;
  const yearInt = Number.parseInt(year, 10);
  return {
    courseId: toCourseId({ courseCode, term, year: yearInt }),
    parentCourseId: toCourseId({ courseCode: parentCourseCode, term, year: yearInt }),
  };
}

export default jexService => async () => {
  // get ALL sections in Jex which end after today
  const recordset = await jexService.query(baseSqlQuery);
  return recordset.map(normalize);

  // then we filter to include only those with parent courses
  // equal to a canvasCourseId
  // const canvasCourseIdLookup = courseIdWhitelist.reduce(
  //   (acc, courseId) => ({ ...acc, [courseId]: true }),
  //   {},
  // );

  // return jexSections.filter(s => canvasCourseIdLookup[s.parentCourseId]);
};

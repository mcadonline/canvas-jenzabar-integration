import toCourseId from '../../utils/toCourseId';
import withCourseRestrictionsSQL from './withOnlyCoursesSql';
import getActiveCoursesByTermYear from '../canvas/getActiveCoursesByTermYear';

const baseSqlQuery = `
declare @today datetime;
set @today = getdate();

select distinct sch.ID_NUM as id
  , rtrim(am_meml.addr_line_2) as username
  , rtrim(sch.crs_cde) as courseCode
  , rtrim(sch.trm_cde) as term
  , year =
    CASE sch.trm_cde
      WHEN 'FA' THEN sch.yr_cde
      ELSE sch.yr_cde + 1
    END
from STUDENT_CRS_HIST sch
left join address_master am_meml
    on sch.id_num = am_meml.id_num
    and am_meml.addr_cde = 'MEML'
-- up to one month after last day of class
where DATEADD(month, 1, sch.end_dte) >= @today
  -- exclude students who have withdrawn
  and (grade_cde is null or (grade_cde is not null and grade_cde <> 'W'))
  -- exclude waitlisted students
  and sch.TRANSACTION_STS <> 'W'
  -- only include students with username
  and am_meml.addr_line_2 is not null
`;

function normalize(record) {
  const {
    id, courseCode, term, year,
  } = record;
  const yearInt = Number.parseInt(year, 10);
  const courseId = toCourseId({ courseCode, term, year: yearInt });

  return {
    user_id: Number.parseInt(id, 10),
    course_id: courseId,
  };
}

/**
 * gets a list of enrollments from Jenzabar for
 * current and future courses.
 */
export default jexService => async () => {
  try {
    const coursesByTerm = await getActiveCoursesByTermYear();

    const sqlQuery = withCourseRestrictionsSQL({
      baseQuery: baseSqlQuery,
      sectionTable: 'sch',
      courses: coursesByTerm,
    });
    const recordset = await jexService.query(sqlQuery);
    return recordset.map(normalize);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

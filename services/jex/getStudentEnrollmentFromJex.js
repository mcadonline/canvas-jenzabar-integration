import jexService from './jexService.js';

const sqlQuery = `
declare @today datetime;
set @today = getdate();

select distinct sch.ID_NUM as id
  , rtrim(nm.first_name) as firstName
  , rtrim(nm.PREFERRED_NAME) as preferredName
  , rtrim(nm.last_name) as lastName
  , rtrim(am_meml.addr_line_1) as mcadEmail
  , rtrim(am_meml.addr_line_2) as username
  , rtrim(sch.crs_cde) as courseCode
  , rtrim(sm.X_LISTED_PARNT_CRS) as parentCourseCode
  , rtrim(sch.trm_cde) as term
  , year =
    CASE sch.trm_cde
      WHEN 'FA' THEN sch.yr_cde
      ELSE sch.yr_cde + 1
    END
from STUDENT_CRS_HIST sch
join name_master nm
  on sch.id_num = nm.id_num
join section_master sm
    on sm.CRS_CDE = sch.CRS_CDE
    and sm.TRM_CDE = sch.TRM_CDE
    and sm.YR_CDE = sch.YR_CDE
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

/**
 * gets a list of enrollments from Jenzabar for
 * current and future courses.
 */
export default async () => {
  try {
    const recordset = await jexService.query(sqlQuery);
    return recordset;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

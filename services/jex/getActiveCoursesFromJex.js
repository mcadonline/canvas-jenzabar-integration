import jexService from './jexService.js';
import fromJexToNormalizedCourse, { isValidJexCourse } from '../../models/Course/fromJex.js';

const sqlQuery = `
select distinct
    year =
    CASE sm.trm_cde
       WHEN 'FA' THEN sm.yr_cde
       ELSE sm.yr_cde + 1
    END
, rtrim(sm.trm_cde) as term
, rtrim(sm.crs_cde) as courseCode
, rtrim(concat(crs_title, ' ', crs_title_2)) as title
, convert(varchar(10), first_begin_dte,120) as startDate
, convert(varchar(10), last_end_dte,120) as endDate
, courseFormat = 
    CASE ss.ROOM_CDE
        WHEN 'OL' THEN 'online'
        ELSE 'on_campus'
    END
, rtrim(x_listed_parnt_crs) as parentCourseCode
, lead_instructr_id as instructorId
, rtrim(nm.first_name) as instructorFirstName
, rtrim(nm.preferred_name) as instructorPrefName
, rtrim(nm.last_name) as instructorLastName
from section_master sm
    join name_master nm
    on sm.LEAD_INSTRUCTR_ID = nm.ID_NUM
    join section_schedules ss
    on ss.CRS_CDE = sm.CRS_CDE
        and ss.TRM_CDE = sm.TRM_CDE
        and ss.YR_CDE = sm.YR_CDE
where
  sm.last_end_dte >= getDate()
  and sm.crs_cde not like '% IN99 %' -- Internships
  and sm.crs_cde not like '% EX99 %' -- Externships
  and sm.crs_cde not like '% IS99 %' -- Independent Studies
  and sm.crs_cde not like 'OC %' -- off campus
  and sm.crs_cde not like 'DT %' -- Preregistration courses
order by year
  , term
  , courseCode
`;

export default async () => {
  // get ALL sections in Jex which end after today
  try {
    const recordset = await jexService.query(sqlQuery);
    return recordset.filter(isValidJexCourse).map(fromJexToNormalizedCourse);
  } catch (err) {
    console.error(`Cannot get active courses from Jex: ${err.message}`);
    return [];
  }
};

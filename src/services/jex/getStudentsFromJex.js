import withCourseRestrictionsSQL from './withOnlyCoursesSql';
import normalizeJexUserData from './normalizeJexUserData';
import settings from '../../settings';

const baseSqlQuery = `
  declare @today datetime;
  set @today = getdate();

  select distinct nm.ID_NUM as sisId
      , rtrim(nm.first_name) as firstName
      , rtrim(nm.PREFERRED_NAME) as preferredName
      , rtrim(nm.MIDDLE_NAME) as middleName
      , rtrim(nm.last_name) as lastName
      , rtrim(am_peml.addr_line_1) as personalEmail
      , rtrim(am_meml.addr_line_1) as mcadEmail
      , rtrim(am_meml.addr_line_2) as username
  from name_master nm
  join STUDENT_CRS_HIST sch
      on sch.id_num = nm.id_num
  left join address_master am_peml
      on nm.id_num = am_peml.id_num
      and am_peml.addr_cde = 'PEML'
  left join address_master am_meml
      on nm.id_num = am_meml.id_num
      and am_meml.addr_cde = 'MEML'
  join section_master sm
      on sm.crs_cde = sch.crs_cde
      and sm.TRM_CDE = sch.TRM_CDE
      and sm.YR_CDE = sch.YR_CDE
  -- up to one month after last day of class
  where DATEADD(month, 1, sm.LAST_END_DTE) >= @today
`;

/**
 * gets students from Jenzabar that are currently enrolled
 * or enrolled in a future course.
 */
export default async function getStudentsFromJex(jexService) {
  try {
    const sqlQuery = withCourseRestrictionsSQL({
      baseQuery: baseSqlQuery,
      courses: settings.onlyCourses,
    });
    const recordset = await jexService.query(sqlQuery);

    // filtering here, rather than in query
    // seems to be faster?
    const activeUsers = recordset.filter(({ username }) => !!username);

    return activeUsers.map(normalizeJexUserData);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

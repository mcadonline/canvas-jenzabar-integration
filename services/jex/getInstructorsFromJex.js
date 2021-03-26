import jexService from './jexService.js';

const sqlQuery = `
declare @today datetime;
set @today = getdate();

select distinct nm.ID_NUM as id
    , rtrim(nm.first_name) as firstName
    , rtrim(nm.PREFERRED_NAME) as preferredName
    , rtrim(nm.last_name) as lastName
    , rtrim(am_peml.addr_line_1) as personalEmail
    , rtrim(am_meml.addr_line_1) as mcadEmail
    , rtrim(am_meml.addr_line_2) as username
from name_master nm
join section_master sm
    on sm.LEAD_INSTRUCTR_ID = nm.id_num
left join address_master am_peml
    on nm.id_num = am_peml.id_num
    and am_peml.addr_cde = 'PEML'
left join address_master am_meml
    on nm.id_num = am_meml.id_num
    and am_meml.addr_cde = 'MEML'
where sm.LAST_END_DTE >= @today
`;

/**
 * gets students from Jenzabar that are currently enrolled
 * or enrolled in a future course.
 */
export default async () => {
  try {
    const recordset = await jexService.query(sqlQuery);

    // filtering here, rather than in query
    // seems to be faster?
    return recordset.filter(({ username }) => !!username);
  } catch (error) {
    console.error(error);
  }
};

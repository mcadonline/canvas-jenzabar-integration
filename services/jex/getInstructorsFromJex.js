import { NAME_MASTER, CONTACT_TABLE, USERNAME_TABLE } from '../../constants/jex.js';
import jexService from './jexService.js';

const sqlQuery = `
declare @today datetime;
set @today = getdate();

select distinct nm.ID_NUM as id
    , rtrim(nm.first_name) as firstName
    , rtrim(nm.PREFERRED_NAME) as preferredName
    , rtrim(nm.last_name) as lastName
    , rtrim(am_peml.AlternateContact) as personalEmail
    , rtrim(am_meml.AlternateContact) as mcadEmail
    , rtrim(nmu.mcad_username) as username
from ${NAME_MASTER} nm
join section_master sm
    on sm.LEAD_INSTRUCTR_ID = nm.id_num
left join ${CONTACT_TABLE} am_peml
    on nm.id_num = am_peml.id_num
    and am_peml.addr_cde = 'PEML'
left join ${CONTACT_TABLE} am_meml
    on nm.id_num = am_meml.id_num
    and am_meml.addr_cde = 'MEML'
left join ${USERNAME_TABLE} nmu
    on nm.id_num = nmu.id_num
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

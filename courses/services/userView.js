import jexService from "../../services/jex/jexService.js"

function queryString(request) {
    let conditionals = ``

    if (request.body.email) {
        conditionals += `am_meml.AlternateContact like '${request.body.email}'`
    }

    if (request.body.id) {
        if (conditionals.length > 0) {
            conditionals += ` and `
        }

        conditionals += `nm.id_num = '${request.body.id}'`;
    }

    if (request.body.name) {
        if (conditionals.length > 0) {
            conditionals += ` and `
        }

        conditionals += `nm.first_name like '${request.body.name}'`;
    }

    return `
        select distinct nm.id_num as id
        , rtrim(nm.first_name) as firstName
        , rtrim(nm.preferred_name) as preferredName
        , rtrim(nm.last_name) as lastName
        , rtrim(nmu.mcad_username) as username
        , rtrim(am_peml.AlternateContact) as personalEmail
        , rtrim(am_meml.AlternateContact) as mcadEmail
        , rtrim(sch.trm_cde) as term
        , rtrim(sch.crs_cde) as courseCode
        , year =
            CASE sch.trm_cde
            WHEN 'FA' THEN sch.yr_cde
            ELSE sch.yr_cde + 1
            END
        , rtrim(concat(sch.crs_title, ' ', sch.crs_title_2)) as courseName
        , sch.credit_hrs as credits
        , ss.begin_dte as startDate
        , ss.end_dte as endDate
        , sch.add_dte as createdAt
        from student_crs_hist sch
        inner join nameMaster nm
            on sch.id_num = nm.id_num
        inner join section_schedules ss
            on ss.crs_cde = sch.crs_cde
            and ss.trm_cde = sch.trm_cde
            and ss.yr_cde = sch.yr_cde
        left join AlternateContactMethod am_meml
            on sch.id_num = am_meml.id_num
            and am_meml.addr_cde = 'MEML'
        left join AlternateContactMethod am_peml
            on sch.id_num = am_peml.id_num
            and am_peml.addr_cde = 'PEML'
        left join name_master_udf nmu
            on nm.id_num = nmu.id_num
        where ${conditionals}
    `
}



export const UserViewQuery = async (request) => {
  const sqlQuery = queryString(request);
  console.log(sqlQuery);
  if (process.env.TEST) {
    return [{
        firstName: 'Jane',
        mcadEmail: 'jane@mcad.com',
        personalEmail: 'jane.doe@gmail.com',
        lastName: 'Doe',
        id: 10,
        preferredName: 'Jane Doe',
    }]
  } else {
    try {
        const recordset = await jexService.query(sqlQuery);
        return recordset;
      } catch (err) {
        console.error(`Cannot get active courses from Jex: ${err.message}`);
        return [];
      }
  } 
};
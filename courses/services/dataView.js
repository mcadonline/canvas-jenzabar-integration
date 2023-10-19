import jexService from "../../services/jex/jexService.js"

function queryString(request) {
    let conditionals = ``

    if (request.body.code) {
        conditionals += `sm.crs_cde like '%${request.body.code}%'`
    }

    if (request.body.startDate) {
        if (conditionals.length > 0) {
            conditionals += ` and `
        }

        conditionals += `sm.first_begin_dte > '${request.body.startDate}'`;
    }

    if (request.body.endDate) {
        if (conditionals.length > 0) {
            conditionals += ` and `
        }

        conditionals += `sm.last_end_dte < '${request.body.endDate}'`;
    }

    if (request.body.modality) {
        if (conditionals.length > 0) {
            conditionals += ` and `
        }

        conditionals += `ss.ROOM_CDE like '%${request.body.modality}%'`;
    }

    if (request.body.activeTerm === '1') {
        if (conditionals.length > 0) {
            conditionals += ` and `
        }

        conditionals += `sm.last_end_dte >= getDate()`;        
    }

    if (request.body.title) {
        if (conditionals.length > 0) {
            conditionals += ` and `
        }

        conditionals += `ss.ROOM_CDE like '%${request.body.modality}%'`;
        crs_title
    }

    return `
    select distinct
        year =
        CASE sm.trm_cde
           WHEN 'FA' THEN sm.yr_cde
           ELSE sm.yr_cde + 1
        END
    , rtrim(sm.trm_cde) as term
    , ss.ROOM_CDE as room_id
    , rtrim(sm.crs_cde) as courseCode
    , rtrim(concat(crs_title, ' ', crs_title_2)) as title
    , convert(varchar(10), first_begin_dte,120) as startDate
    , convert(varchar(10), last_end_dte,120) as endDate
    , courseFormat = 
        CASE 
            WHEN ss.ROOM_CDE IN('OL', 'OLS', 'OLA') THEN 'online'
            ELSE 'on_campus'
        END
    , rtrim(x_listed_parnt_crs) as parentCourseCode
    , lead_instructr_id as instructorId
    , rtrim(nm.first_name) as instructorFirstName
    , rtrim(nm.preferred_name) as instructorPrefName
    , rtrim(nm.last_name) as instructorLastName
    from section_master sm
        join nameMaster nm
        on sm.LEAD_INSTRUCTR_ID = nm.ID_NUM
        join section_schedules ss
        on ss.CRS_CDE = sm.CRS_CDE
            and ss.TRM_CDE = sm.TRM_CDE
            and ss.YR_CDE = sm.YR_CDE
    where
      ${conditionals}
    order by year
      , term
      , courseCode
    `
}



export const DataViewQuery = async (request) => {
  const sqlQuery = queryString(request);
  console.log(sqlQuery);
  if (process.env.TEST) {
    return [{
        term: 'FA',
        room_id: 10,
        courseCode: 'ABC',
        title: 'First Course',
        startDate: '10-10-2023',
        endDate: '10-10-2024',
        instructorPrefName: 'Alex'
    }]
  } else {
    try {
        console.log(sqlQuery)
        const recordset = await jexService.query(sqlQuery);
        return recordset;
      } catch (err) {
        console.error(`Cannot get active courses from Jex: ${err.message}`);
        return [];
      }
  } 
};
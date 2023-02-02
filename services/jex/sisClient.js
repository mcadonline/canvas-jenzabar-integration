import getStudentEnrollmentFromJex from "./getStudentEnrollmentFromJex.js";
import getActiveCoursesFromJex from './getActiveCoursesFromJex.js';
import getInstructorsFromJex from "./getInstructorsFromJex.js";

let map = {
    activeCourses: getActiveCoursesFromJex,
    stdEnrollment: getStudentEnrollmentFromJex,
    instructors: getInstructorsFromJex,
    custom: 'nothing'
}
let runner = process.argv[2];

if (!runner || !map[runner]) {
    throw 'Provide a runner'
}

if (runner === 'custom') {
    let sqlQuery = '';
    let getData = async () => {
        // get ALL sections in Jex which end after today
        try {
          const recordset = await jexService.query(sqlQuery);
          console.log(recordset);
        } catch (err) {
          console.error(`Cannot run the custom query ${err.message}`);
          return [];
        }
    };

    getData().then(() => console.log('Run Complete'))
} else {
    map[runner]().then(response => {
        console.log(response);
    })
}

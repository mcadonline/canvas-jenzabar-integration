// const generateShell =  require('../../generators/generateCourseShells')
import generateShell from '../../generators/generateCourseShells.js'
import generateEnrollFaculty from '../../generators/generateEnrollFaculty.js';
import canvas from '../../services/canvas/index.js';
import { Job, Exports, Mapping } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import writeToFile from '../../utils/writeToFile.js';


const services = {
    generateCourseShells: generateShell,
    generateEnrollment: generateEnrollFaculty,
    getCanvasCourses: canvas.getCourses,
}

const createJobExports = (data, jobId) => {
    Mapping.All((err, mappings) => {
        let mappingSet = {};

        mappings.forEach(mapping => {
            mappingSet[mapping.source_key] = mappingSet[mapping.source_key] || [];
            mappingSet[mapping.source_key].push(mapping);
        })

        if (data.length) {
            let keys = Object.keys(data[0]);

            data.forEach((course) => {
                keys.forEach(key => {
                    console.log(key);
                    if (mappingSet[key]) {
                        console.log(mappingSet[key]);
                        mappingSet[key].forEach(mapKey => {
                            if (course[key] === mapKey.source_value) {
                                course[mapKey.map_key] = mapKey.map_value;
                            }
                        });
                    }
                })

                Exports.Create({
                    stringifiedData: JSON.stringify(course),
                    jobId
                }, (err) => {
                    if (err) {
                        console.error(err);
                    }
                })
            });
        }
    });    
} 

export const EngineService = {
    async run(runner, response) {
        if (services[runner]) {
            const jobId = uuidv4();
            await Job.Create({ category: runner, uuid: jobId }, async (err) => {
                if (err) {
                    console.error(err);
                    response.error({
                        error: err
                    })
                }
    
                response.json({
                    jobId: jobId
                });    
    
                let data = await services[runner]();
            //     let data = [{
            //         course_id: "ABC4",
            //         short_name: "ABC1",
            //         long_name: "First Cource",
            //         room_id: 'OL',
            //         term_id: `A-B`,
            //         start_date: '', // start_date field required for end_date to "take" in SIS Import
            //         end_date: new Date(),
            //         status: 'active',
            //         blueprint_course_id: 'TEMPLATE-ESSENTIALS',
            //     },
            //     {
            //         course_id: "ABC4",
            //         short_name: "ABC1",
            //         long_name: "First Cource",
            //         room_id: 'L',
            //         term_id: `A-B`,
            //         start_date: '', // start_date field required for end_date to "take" in SIS Import
            //         end_date: new Date(),
            //         status: 'active',
            //         blueprint_course_id: 'TEMPLATE-ESSENTIALS',
            //     }
            
            // ]

            
                createJobExports(data, jobId);
            });
        } else {
            response.error('No Runners running')
        }
    
        // const fileDest = await writeToFile(csv);
        // logger.log(`👍  Saving to file: ${fileDest}`);
    }
}


// const generateShell =  require('../../generators/generateCourseShells')
import generateShell from '../../generators/generateCourseShells.js'
import canvas from '../../services/canvas/index.js';

const services = {
    generateCourseShells: generateShell,
    getCanvasCourses: canvas.getCourses,
}

export const EngineService = {
    run(runner) {

        if (services[runner]) {
            services[runner]().then(response => {
                console.log('Here')
            });
        }

        // console.log(runner);
        // // Call it here.
        // if (runner === 'generateCourseShells') {
        //     generateShell().then(response => {
        //         // get the csv here.
        //     });
        // }
    }
}
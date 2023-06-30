import { db } from '../utils/db.js';

// DB model for courses
// export default {
//     table: 'jobs',
//     connection() { return db.connection },
//     all() { return this.connection().run(`Select * from ${this.table}`) },
//     attributesParser(data) { return JSON.stringify(data.attributes || {})},
//     create(data) { 
        
//     }
// }

const TABLE = 'jobs';

function connection() {
    return db.connection;
}

export function All(callback) {
    return connection().all(`Select * from ${TABLE}`, [], callback);
}

export function Create(data, callback) {
    return connection().run(`Insert into ${TABLE} (category, status, started, jobId)
            VALUES ("${data.category}", "running", "May", "${data.uuid}") RETURNING id;`, [], callback) 
}
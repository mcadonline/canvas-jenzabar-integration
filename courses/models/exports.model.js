import { db } from '../utils/db.js';

const TABLE = 'exports';
function connection() {
    return db.connection;
}

export function All(callback) {
    return connection().all(`Select * from ${TABLE}`, [], callback);
}

export function Create(data, callback) {
    return connection().run(`Insert into ${TABLE} (data, jobId)
            VALUES (?, "${data.jobId}");`, [data.stringifiedData], callback) 
}

export function FindByJobId(jobId ,callback) {
    return connection().all(`Select * from ${TABLE} WHERE jobId = ?`, [jobId], callback)
}
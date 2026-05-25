import { db } from '../utils/db.js';

const TABLE = 'mappings';

function connection() {
    return db.connection;
}

export function All(callback) {
    return connection().all(`Select * from ${TABLE}`, [], callback);
}

export function Create(data, callback) {
    return connection().run(`Insert into ${TABLE} (source_key, source_value, map_key, map_value, uuid)
            VALUES ("${data.sourceKey}", "${data.sourceValue}", "${data.mapKey}", "${data.mapValue}", "${data.uuid}")`, [], callback) 
}
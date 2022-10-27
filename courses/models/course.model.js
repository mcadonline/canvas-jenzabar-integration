// const { db } = require('../utils/db');
import { db } from '../utils/db';

// DB model for courses
module.exports = {
    table: 'courses',
    connection() { return db.connection },
    all() { return this.connection().run(`Select * from ${this.table}`) },
    attributesParser(data) { return JSON.stringify(data.attributes || {})},
    create(data) { 
        return this.connection()
            .run(`Insert into ${this.table} (name, sisId, terms, attributes)
                    VALUES (${data.name, data.rules, data.terms, this.attributesParser(data)})`) 
    }
}

// const { db } = require('../utils/db');
import { db } from '../utils';

// DB model for rules
module.exports = {
    table: 'rules',
    connection() { return db.connection },
    all() { return this.connection().run(`Select * from ${this.table}`) },
    create(data) { this.connection().run(`Insert into ${this.table} (name, rules) VALUES (${data.name, data.rules})`) } 
}

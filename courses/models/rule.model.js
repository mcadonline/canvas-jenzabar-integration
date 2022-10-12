const { db } = require('../utils/db');

// DB model for rules
module.exports = {
    table: 'rules',
    connection: () => { db.connection },
    all: () => { this.connection().run(`Select * from ${this.table}`) },
    create: (data) => { this.connection().run(`Insert into ${this.table} (name, rules) VALUES (${data.name, data.rules})`) } 
}

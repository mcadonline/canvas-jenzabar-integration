const sqlite3 = require('sqlite3').verbose();
let db = {};

function initiateDb() {
    db.connection = new sqlite3.Database('./db/courses.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the courses database.');
    });
    console.log(db);

    require('../migrations')(db.connection);
}

module.exports = { initiateDb, db };
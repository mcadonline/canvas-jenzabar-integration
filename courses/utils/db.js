
import sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose()
import migrations from '../migrations/index.js';

export const db = {};

export function initiateDb() {
    db.connection = new sqlite3.Database('./db/courses.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the courses database.');
    });
    console.log(db);
   migrations(db.connection);
}

// export default { initiateDb, db }

// exports.initiateDb = initiateDb;
// exports.db = db;
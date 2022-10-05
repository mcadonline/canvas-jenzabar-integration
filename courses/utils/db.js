const sqlite3 = require('sqlite3').verbose();
let db;

function initiateDb() {
    db = new sqlite3.Database('./db/courses.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the courses database.');
    });
}

// db.serialize(() => {
//   db.each(`SELECT PlaylistId as id,
//                   Name as name
//            FROM playlists`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.name);
//   });
// });

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

module.exports = { initiateDb, db };
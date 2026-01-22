export default (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS exports(
        id INTEGER NOT NULL PRIMARY KEY,
        data TEXT NOT NULL,
        JobId TEXT NOT NULL
    );`)

    // db.run('DROP TABLE exports')
}

// data will be of type json although stringified as we might have a complex
export default (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS jobs(
        id INTEGER NOT NULL PRIMARY KEY,
        category TEXT NOT NULL,
        status TEXT NOT NULL,
        started TEXT NOT NULL,
        finished TEXT,
        jobId TEXT NOT NULL
    );`)

    // db.run('DROP TABLE jobs')
}
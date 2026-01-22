export default (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS courses(
        id INTEGER NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        sisId TEXT NOT NULL,
        terms TEXT NOT NULL,
        attributes TEXT NOT NULL
    );`)
}
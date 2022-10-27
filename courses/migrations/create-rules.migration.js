export default (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS rules(
        id INTEGER NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        rules TEXT NOT NULL
    );`)
}
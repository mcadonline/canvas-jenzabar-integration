export default (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS mappings(
        id INTEGER NOT NULL PRIMARY KEY,
        source_key TEXT NOT NULL,
        source_value TEXT NOT NULL,
        map_key TEXT NOT NULL,
        map_value TEXT NOT NULL,
        uuid TEXT NOT NULL
    );`)

    // db.run('DROP TABLE mappings')
}
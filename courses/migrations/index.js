module.exports = (db) => {
    require('./create-rules.migration')(db)
}
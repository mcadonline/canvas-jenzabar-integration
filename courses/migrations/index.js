import rulesMigration from './create-rules.migration.js';
import courseMigration from './create-courses.migration.js';
import jobsMigration from './create-jobs.migration.js'
import createExportsMigration from './create-exports.migration.js';
import createMappingsMigration from './create-mappings.migration.js';

export default (db) => {
    rulesMigration(db);
    courseMigration(db);
    jobsMigration(db);
    createExportsMigration(db);
    createMappingsMigration(db);
}

// module.exports = (db) => {
   
//     // require('./create-rules.migration')(db);
//     // require('./create-courses.migration');
// }
import rulesMigration from './create-rules.migration.js';
import courseMigration from './create-courses.migration.js';


export default (db) => {
    rulesMigration(db);
    courseMigration(db)
}

// module.exports = (db) => {
   
//     // require('./create-rules.migration')(db);
//     // require('./create-courses.migration');
// }
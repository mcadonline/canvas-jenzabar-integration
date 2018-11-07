import settings from '../../settings';
import toJexYear from '../../utils/toJexYear';

const { onlyCourses, onlyTerm, onlyRealYear } = settings;

export default (sql, sectionTable = 'sm') => {
  const jexYear = toJexYear({ term: onlyTerm, realYear: onlyRealYear });
  const restrictions = [
    `and ${sectionTable}.crs_cde in ('${onlyCourses.join("','")}')`,
    `and ${sectionTable}.trm_cde = '${onlyTerm}'`,
    `and ${sectionTable}.yr_cde = '${jexYear}'`,
  ].join('\n');

  return sql.concat(restrictions);
};

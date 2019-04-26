import settings from '../../settings';
import toJexYear from '../../utils/toJexYear';

const { onlyCourses } = settings;

export default (sql, sectionTable = 'sm') => {
  const restrictions = onlyCourses
    .map(({ year, term, sections }) => {
      const jexYear = toJexYear({ term, realYear: year });
      return `(
        ${sectionTable}.crs_cde in ('${sections.join("', '")}')
        and ${sectionTable}.trm_cde = '${term}'
        and ${sectionTable}.yr_cde = '${jexYear}'
      )`;
    })
    .join('\n or ');

  return sql.concat(`and (${restrictions})`);
};

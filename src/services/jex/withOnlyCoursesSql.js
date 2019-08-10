import settings from '../../settings';
import toJexYear from '../../utils/toJexYear';

const { onlyCourses } = settings;

export default function withOnlyCoursesSql({
  baseQuery,
  sectionTable = 'sm',
  courses = onlyCourses,
}) {
  // restrict to Canvas Courses
  const restrictionsSQL = courses
    .map(({ year, term, sections }) => {
      const jexYear = toJexYear({ term, realYear: year });
      return `(
      ${sectionTable}.crs_cde in ('${sections.join("', '")}')
      and ${sectionTable}.trm_cde = '${term}'
      and ${sectionTable}.yr_cde = '${jexYear}'
    )`;
    })
    .join('\n or ');

  return baseQuery.concat(`and (${restrictionsSQL})`);
}

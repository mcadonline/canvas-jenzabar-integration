/**
 * Converts an academic (Jenzabar) year into a calendar (real) year.
 * @param {string} term - 2 letter Jex term ('FA', 'SP, 'SU')
 * @param {int} jexYear - 4 digit Academic year. e.g. 2017 === AY2017-8
 * @returns {int} real calendar year of a given term
 * @example
 *
 * toCalendarYear({ term: 'SP', academicYear: 2017 })
 * // returns 2018
 */
export default function toRealYear({ term, jexYear }) {
  if (!term || !jexYear) throw new Error('missing term or jexYear');
  const jexYearInt = Number.parseInt(jexYear, 10);
  if (term === 'FA') return jexYearInt;
  return jexYearInt + 1;
}

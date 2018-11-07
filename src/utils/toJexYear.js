/**
 * converts a real year to a Jenzabar Academic Year
 * @param {string} term - Semester Code like 'FA', 'SP' or 'SU'
 * @param {string|int} realYear - Real calendar year
 * @returns {int} Academic Year
 *
 * @example
 * getJexYear({term: 'SP', realYear: 2018})
 * // returns 2017 since Spring of 2018 is in AY2017-18
 */
export default function toJexYear({ term, realYear }) {
  if (!term || !realYear) throw Error('missing term or realYear');
  const yearInt = Number.parseInt(realYear, 10);
  return term === 'FA' ? yearInt : yearInt - 1;
}

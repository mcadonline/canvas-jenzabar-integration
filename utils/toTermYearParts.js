/**
 * converts a termYear string into an object with term and year
 */
export default termYear => {
  const termMapping = {
    F: 'FA',
    W: 'SP',
    S: 'SU',
  };

  const splitterRegEx = /^(?<oneLetterTerm>[FWS])(?<shortYear>[0-9]{2})/;
  const {
    groups: { oneLetterTerm, shortYear },
  } = splitterRegEx.exec(termYear);

  return {
    term: termMapping[oneLetterTerm],
    year: `20${shortYear}`,
  };
};

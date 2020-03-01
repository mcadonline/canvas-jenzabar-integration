export default termCode => {
  if (termCode === 'FA') return 'Fall';
  if (termCode === 'SP') return 'Spring';
  if (termCode === 'SU') return 'Summer';
  throw new Error(`${JSON.stringify(termCode)} is not a valid termCode`);
};

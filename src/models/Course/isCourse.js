/**
 * checks for the existance of an SIS ID like 'GWD-6610-20-F19'
 */
const expectedKeys = [
  'id',
  'name',
  'term',
  'year',
  'startDate',
  'endDate',
  'openDate',
  'closeDate',
  'courseFormat',
  'instructor',
];

export default candidate => {
  return expectedKeys.every(key => !!candidate[key]);
};

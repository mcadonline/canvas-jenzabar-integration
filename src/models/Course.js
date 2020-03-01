import validator from 'validator';

const createValidator = (validatorName, testFn) => candidate => {
  if (!validatorName) {
    throw new Error(`missing validatorName`);
  }

  if (typeof testFn !== 'function') {
    throw new Error(`testFn is not a valid function`);
  }

  const errorMessage = `${validatorName} ${JSON.stringify(
    candidate
  )} is not a valid course ${validatorName}`;

  try {
    if (testFn(candidate)) return;
  } catch (err) {
    throw new Error(errorMessage);
  }

  throw new Error(errorMessage);
};

const isStringID = x => typeof x === 'string' && /^[a-zA-Z0-9_-]+$/.test(x);
const isTerm = x => /^(FA|SP|SU)$/.test(x);
const isYear = x => Number.isInteger(x) && x >= 1900;

const validateId = createValidator('id', isStringID);
const validateName = createValidator('name', validator.isAscii);
const validateTerm = createValidator('term', isTerm);
const validateYear = createValidator('year', isYear);
const validateDate = createValidator('date', validator.isISO8601);
const validateIsOnline = createValidator('isOnline', x => typeof x === 'boolean');

function createCourse({ id, name, term, year, startDate, endDate, isOnline }) {
  validateId(id);
  validateName(name);
  validateTerm(term);
  validateYear(year);
  validateDate(startDate);
  validateDate(endDate);
  validateIsOnline(isOnline);

  const course = {
    id,
    name,
    term,
    year,
    startDate,
    endDate,
    isOnline,
  };
  return course;
}

export default {
  fromJex: createCourse,
};

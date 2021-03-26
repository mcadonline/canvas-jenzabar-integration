export default (validatorName, testFn) => candidate => {
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

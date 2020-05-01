const csvRegExLine = /^("[^"]+"(,"[^"]+")*)$/;

const getNumEntries = record => record.split('","').length + 1;

export default str => {
  const lines = str.split('\n');
  const entriesInFirstLine = getNumEntries(lines[0]);
  return lines
    .map(_ => _.trim())
    .every(line => {
      const isValidNumberOfEntries = getNumEntries(line) === entriesInFirstLine;
      const isValidCsvLine = csvRegExLine.test(line);
      return isValidCsvLine && isValidNumberOfEntries;
    });
};

export default (sisCourseIds) => {
  const termYearDict = sisCourseIds.reduce((acc, courseId) => {
    const [dept, courseNumber, section, termYear] = courseId.split('-');
    const courseCode = `${dept.padEnd(4)} ${courseNumber} ${section}`;
    return {
      ...acc,
      [termYear]: acc[termYear] ? acc[termYear].concat(courseCode) : [courseCode],
    };
  }, {});

  const termLookup = {
    F: 'FA',
    W: 'SP',
    S: 'SU',
  };

  return Object.entries(termYearDict).map(([termYear, sections]) => {
    const term = termLookup[termYear.charAt(0)];
    const shortYear = termYear.slice(1);
    const year = Number.parseInt(`20${shortYear}`, 10);
    return { term, year, sections };
  });
};

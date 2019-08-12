import toCourseId from './toCourseId';

/**
 * Reduces the jexEnrollment to only those that
 * are enrolled in an active canvas section
 */
export default ({ activeCanvasSections, jexEnrollment }) => {
  // createa lookup table so that we can see which
  // of our jex students may be in an active canvas section
  const activeSectionIdLookup = activeCanvasSections
    .map(s => s.sis_section_id)
    .reduce((acc, id) => ({ ...acc, [id]: true }), {});

  return jexEnrollment.filter(({ courseCode, term, year }) => {
    const sectionId = toCourseId({ courseCode, term, year });
    const isInActiveSection = !!activeSectionIdLookup[sectionId];
    return isInActiveSection;
  });
};

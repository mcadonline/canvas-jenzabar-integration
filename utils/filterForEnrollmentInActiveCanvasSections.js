import toCourseId from './toCourseId.js';
import toCourseIdParts from './toCourseIdParts.js';

/**
 * Reduces the jexEnrollment to only those that
 * are enrolled in an active canvas section
 */
export default ({ activeCanvasSections, jexEnrollment }) => {
  // create a lookup table of active sections
  // the sections are keyed by the base course id
  // ex: section `GWD-6610-20-F20-A` is keyed with `GWD-6610-20-F20`
  const activeSectionIdLookup = activeCanvasSections
    .map((s) => s.sis_section_id)
    .reduce((acc, sisSectionId) => {
      // we
      // sisSectionId's may be related to the same course Id in Jenzabar
      const courseIdObj = toCourseIdParts(sisSectionId);
      const baseSectionId = toCourseId(courseIdObj);

      const setOfSectionsRelatedToBaseSectionId = acc[baseSectionId] || new Set();

      // lookup based on sisCourseId
      // every section matching part of the sisCourseId appears in the list
      return {
        ...acc,
        [baseSectionId]: setOfSectionsRelatedToBaseSectionId.add(sisSectionId),
      };
    }, {});

  return jexEnrollment.reduce((acc, enrollment) => {
    // check to see if this enrollment base section id is in
    // our activeSectionIdLookup
    // if not, we can skip this enrollment
    const sisCourseId = toCourseId(enrollment);
    const setOfActiveSections = activeSectionIdLookup[sisCourseId];
    if (!setOfActiveSections) return acc;

    // this enrollment is in active section(s)
    // add an enrollment for each canvasSisSectionId
    const sectionEnrollments = Array.from(setOfActiveSections).map((canvasSisSectionId) => ({
      ...enrollment,
      canvasSisSectionId,
    }));

    return [...acc, ...sectionEnrollments];
  }, []);
};

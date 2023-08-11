import generateEnrollAdds from './generateEnrollAdds.js';
import generateEnrollDrops from './generateEnrollDrops.js';
import generateUsers from './generateUsers.js';
import generateSectionsForActiveCourses from './generateSectionsForActiveCourses.js';
import generateCourseShells from './generateCourseShells.js';
import generateCourseUpdates from './generateCourseUpdates.js';
import generateEnrollFaculty from './generateEnrollFaculty.js';
import generateEnrollFacultySenate from './generateEnrollFacultySenate.js';
import generateSandboxes from './generateSandboxes.js';
import generateEnrollSandbox from './generateEnrollSandbox.js';
import generateCoursesToPublish from './generateCoursesToPublish.js';
import generateEnrollRepository from './generateEnrollRepository.js';
import generateRepositories from './generateRepositories.js';

export default {
  enrollAdds: generateEnrollAdds,
  enrollDrops: generateEnrollDrops,
  enrollFaculty: generateEnrollFaculty,
  enrollFacultySenate: generateEnrollFacultySenate,
  enrollSandbox: generateEnrollSandbox,
  users: generateUsers,
  sections: generateSectionsForActiveCourses,
  courseShells: generateCourseShells,
  courseUpdates: generateCourseUpdates,
  courseSandboxes: generateSandboxes,
  coursesToPublish: generateCoursesToPublish,
  enrollRepository: generateEnrollRepository,
  courseRepositories: generateRepositories,
};

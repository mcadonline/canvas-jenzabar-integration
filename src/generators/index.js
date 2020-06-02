import generateEnrollAdds from './generateEnrollAdds';
import generateEnrollDrops from './generateEnrollDrops';
import generateUsers from './generateUsers';
import generateSectionsForActiveCourses from './generateSectionsForActiveCourses';
import generateCourseShells from './generateCourseShells';
import generateCourseUpdates from './generateCourseUpdates';
import generateEnrollFaculty from './generateEnrollFaculty';
import generateSandboxes from './generateSandboxes';
import generateEnrollSandbox from './generateEnrollSandbox';

export default {
  enrollAdds: generateEnrollAdds,
  enrollDrops: generateEnrollDrops,
  enrollFaculty: generateEnrollFaculty,
  enrollSandbox: generateEnrollSandbox,
  users: generateUsers,
  sections: generateSectionsForActiveCourses,
  courseShells: generateCourseShells,
  courseUpdates: generateCourseUpdates,
  courseSandboxes: generateSandboxes,
};

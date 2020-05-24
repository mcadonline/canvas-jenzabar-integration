import generateEnrollAdds from './generateEnrollAdds';
import generateEnrollDrops from './generateEnrollDrops';
import generateUsers from './generateUsers';
import generateSectionsForActiveCourses from './generateSectionsForActiveCourses';
import generateCourses from './generateCourses';
import generateEnrollFaculty from './generateEnrollFaculty';
import generateSandboxes from './generateSandboxes';

export default {
  enrollAdds: generateEnrollAdds,
  enrollDrops: generateEnrollDrops,
  enrollFaculty: generateEnrollFaculty,
  users: generateUsers,
  sections: generateSectionsForActiveCourses,
  courses: generateCourses,
  sandboxes: generateSandboxes,
};

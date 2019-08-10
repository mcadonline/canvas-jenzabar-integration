import generateEnrollAdds from './generateEnrollAdds';
import generateEnrollDrops from './generateEnrollDrops';
import generateUsers from './generateUsers';
import generateSectionsForActiveCourses from './generateSectionsForActiveCourses';

export default {
  enrollAdds: generateEnrollAdds,
  enrollDrops: generateEnrollDrops,
  users: generateUsers,
  sections: generateSectionsForActiveCourses,
};

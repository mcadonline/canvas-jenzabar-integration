import createSQLService from '../createSQLService';
import getStudentsFromJex from './getStudentsFromJex';
import getInstructorsFromJex from './getInstructorsFromJex';
import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';
import getSectionsFromJex from './getSectionsFromJex';

const jexService = createSQLService('jex');

export default {
  async getUsers() {
    const [students, faculty] = await Promise.all([
      getStudentsFromJex(jexService),
      getInstructorsFromJex(jexService),
    ]);
    return students.concat(faculty);
  },
  // TODO: Make each function take jexService list getSections
  getStudentEnrollment: () => getStudentEnrollmentFromJex(jexService),
  getSections: getSectionsFromJex(jexService),
  close: () => jexService.close(),
};

import createSQLService from '../createSQLService';
import getStudentsFromJex from './getStudentsFromJex';
import getInstructorsFromJex from './getInstructorsFromJex';
import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';

const jexService = createSQLService('jex');

export default {
  async getUsers() {
    const [students, faculty] = await Promise.all([
      getStudentsFromJex(jexService),
      getInstructorsFromJex(jexService),
    ]);
    return students.concat(faculty);
  },
  async getStudentEnrollment() {
    return getStudentEnrollmentFromJex(jexService);
  },
  async close() {
    await jexService.close();
  },
};

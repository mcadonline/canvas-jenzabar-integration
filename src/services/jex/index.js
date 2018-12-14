import SQLService from '../SQLService';
import getStudentsFromJex from './getStudentsFromJex';
import getInstructorsFromJex from './getInstructorsFromJex';
import getEnrollmentFromJex from './getEnrollmentFromJex';

const jexService = new SQLService('jex');

export default {
  async getUsers() {
    const [students, faculty] = await Promise.all([
      getStudentsFromJex(jexService),
      getInstructorsFromJex(jexService),
    ]);
    return students.concat(faculty);
  },
  getEnrollment: () => getEnrollmentFromJex(jexService),
  close() {
    jexService.close();
  },
};

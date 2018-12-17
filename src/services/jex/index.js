import SQLService from '../SQLService';
import getStudentsFromJex from './getStudentsFromJex';
import getInstructorsFromJex from './getInstructorsFromJex';
import getStudentEnrollmentFromJex from './getStudentEnrollmentFromJex';

const jexService = new SQLService('jex');

export default {
  async getUsers() {
    const [students, faculty] = await Promise.all([
      getStudentsFromJex(jexService),
      getInstructorsFromJex(jexService),
    ]);
    return students.concat(faculty);
  },
  getStudentEnrollment: () => getStudentEnrollmentFromJex(jexService),
  close() {
    jexService.close();
  },
};

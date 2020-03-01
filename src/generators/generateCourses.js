import jsonToCSV from '../utils/jsonToCSV';

const courses = [
  {
    id: 'GWD-6610-20-W20',
    name: 'Web Development -- J. Johnson (Sect. 20 - Spring 2020)',
    term: 'SP',
    year: 2020,
    startDate: '2020-01-20',
    endDate: '2020-05-31',
    isOnline: true,
  },
];

export default async () => {
  return Promise.resolve(jsonToCSV(courses));
};

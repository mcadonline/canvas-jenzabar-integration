import { DateTime } from 'luxon';

export default jest.fn().mockResolvedValue([
  {
    id: 1,
    name: 'Completed Course',
    start_date: '2019-01-20T06:00:00Z',
    end_date: '2019-05-31T05:00:00Z',
    course_id: 'SIS-COMPLETED-W19',
  },
  {
    id: 2,
    name: 'Open Currently Course',
    start_date: DateTime.utc()
      .plus({ months: -2 })
      .toString(),
    end_date: DateTime.utc()
      .plus({ months: 2 })
      .toString(),
    course_id: 'SIS-OPEN-F20',
  },
  {
    id: 3,
    name: 'Upcoming Course',
    start_date: DateTime.utc()
      .plus({ months: 4 })
      .toString(),
    end_date: DateTime.utc()
      .plus({ months: 8 })
      .toString(),
    course_id: 'SIS-UPCOMING-F99',
  },
  {
    id: 4,
    name: 'Open Indefinitely',
    start_date: null,
    end_date: null,
    course_id: 'SIS-INDEFINITE-F99',
  },
  {
    id: 5,
    name: 'No SIS ID',
    start_date: null,
    end_date: null,
    course_id: null,
  },
]);

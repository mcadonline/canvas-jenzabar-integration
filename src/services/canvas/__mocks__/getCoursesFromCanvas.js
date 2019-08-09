import { DateTime } from 'luxon';

export default jest.fn().mockResolvedValue([
  {
    id: 1,
    name: 'Completed Course',
    start_at: '2019-01-20T06:00:00Z',
    end_at: '2019-05-31T05:00:00Z',
    sis_course_id: 'SIS-COMPLETED',
  },
  {
    id: 2,
    name: 'Open Currently Course',
    start_at: DateTime.utc()
      .plus({ months: -2 })
      .toString(),
    end_at: DateTime.utc()
      .plus({ months: 2 })
      .toString(),
    sis_course_id: 'SIS-OPEN',
  },
  {
    id: 3,
    name: 'Upcoming Course',
    start_at: DateTime.utc()
      .plus({ months: 4 })
      .toString(),
    end_at: DateTime.utc()
      .plus({ months: 8 })
      .toString(),
    sis_course_id: 'SIS-UPCOMING',
  },
  {
    id: 4,
    name: 'Open Indefinitely',
    start_at: null,
    end_at: null,
    sis_course_id: 'SIS-INDEFINITE',
  },
  {
    id: 5,
    name: 'No SIS ID',
    start_at: null,
    end_at: null,
    sis_course_id: null,
  },
]);

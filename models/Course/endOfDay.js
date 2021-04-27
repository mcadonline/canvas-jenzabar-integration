import { DateTime } from 'luxon';

export default (isoDate) => {
  const d = DateTime.fromISO(isoDate);
  return DateTime.fromObject({
    year: d.year,
    month: d.month,
    day: d.day,
    hour: 23,
    minute: 59,
    second: 59,
  }).toISO();
};

import { DateTime } from 'luxon';

export default isoDateStr => {
  const d = DateTime.fromISO(isoDateStr);
  return DateTime.fromObject({
    year: d.year,
    month: d.month,
    day: d.daysInMonth,
    hour: 23,
    minute: 59,
    second: 59,
  }).toISO();
};

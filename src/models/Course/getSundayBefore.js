import { DateTime } from 'luxon';

export default isoDateStr => {
  const d = DateTime.fromISO(isoDateStr);
  const sundayBefore = d.minus({ days: d.weekday });
  return sundayBefore.toISODate();
};

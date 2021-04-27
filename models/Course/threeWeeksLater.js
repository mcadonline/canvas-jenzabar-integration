import { DateTime } from 'luxon';

export default (isoDate) => DateTime.fromISO(isoDate).plus({ weeks: 3 }).toISO();

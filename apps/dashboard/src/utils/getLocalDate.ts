import { getLocalTimeZone, today } from '@internationalized/date';

export const getLocalDate = () => {
  const localDate = today(getLocalTimeZone());

  const yy = localDate.year;
  const mm = localDate.month;
  const dd = localDate.day;

  return `${yy}-${mm}-${dd}`;
};

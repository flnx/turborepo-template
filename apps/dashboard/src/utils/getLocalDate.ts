import { getLocalTimeZone, today } from '@internationalized/date';

export const getLocalDate = () => {
  const localDate = today(getLocalTimeZone());

  const yy = localDate.year;
  const mm = localDate.month.toString().padStart(2, '0');
  const dd = localDate.day.toString().padStart(2, '0');

  return `${yy}-${mm}-${dd}`;
};

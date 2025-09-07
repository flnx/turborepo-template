import { getLocalTimeZone, parseDate, today } from '@internationalized/date';

export const getLocalDate = () => {
  const localDate = today(getLocalTimeZone());

  const yy = localDate.year;
  const mm = localDate.month.toString().padStart(2, '0');
  const dd = localDate.day.toString().padStart(2, '0');

  return `${yy}-${mm}-${dd}`;
};

export const getFormattedDate = (date: string) => {
  const parsedDate = parseDate(date);

  const nativeDate = parsedDate.toDate(getLocalTimeZone());
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(nativeDate);

  return formattedDate;
};

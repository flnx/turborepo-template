import { getHabits } from '@/api/getHabits';
import { queryOptions } from '@tanstack/react-query';

export const getHabitsQueryOptions = () =>
  queryOptions({
    queryKey: ['habits'],
    queryFn: getHabits,
  });

import { getHabits } from '@/api/habits';
import { queryOptions } from '@tanstack/react-query';

export const habitKeys = {
  all: ['habits'] as const,
  lists: () => [...habitKeys.all, 'list'] as const,
  list: (filters: string) => [...habitKeys.lists(), { filters }] as const,
  details: () => [...habitKeys.all, 'detail'] as const,
  detail: (id: string) => [...habitKeys.details(), id] as const,
};

export const getHabitsQueryOptions = () =>
  queryOptions({
    queryKey: habitKeys.lists(),
    queryFn: getHabits,
  });

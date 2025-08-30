import { createHabit, deleteHabit, getHabits } from '@/api/habits';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

const habitKeys = {
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

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
    },
  });
};

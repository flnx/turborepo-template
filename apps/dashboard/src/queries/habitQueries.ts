import {
  completeHabit,
  createHabit,
  deleteHabit,
  getHabits,
  uncompleteHabit,
} from '@/api/habits';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import type { CompleteHabit, Habit } from '@repo/schemas/types/habit';

const habitKeys = {
  all: ['habits'] as const,
  lists: () => [...habitKeys.all, 'list'] as const,
  list: (filters: string) => [...habitKeys.lists(), { filters }] as const,
  details: () => [...habitKeys.all, 'detail'] as const,
  detail: (id: string) => [...habitKeys.details(), id] as const,
};

export const getHabitsQueryOptions = (date: string) =>
  queryOptions({
    queryKey: habitKeys.list(date),
    queryFn: () => getHabits(date),
  });

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
  });
};

export const useCompleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CompleteHabit & { isCompleted: boolean }) => {
      if (data.isCompleted) {
        return completeHabit({ id: data.id, date: data.date });
      }

      return uncompleteHabit({ id: data.id, date: data.date });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },

    onMutate: (data) => {
      const { id, isCompleted, date } = data;

      const prevData = queryClient.getQueryData<Habit[]>(habitKeys.list(date)) || [];

      const newData = prevData.map((habit) => {
        if (habit.id === id) {
          return { ...habit, is_completed: isCompleted };
        }
        return habit;
      });

      queryClient.setQueryData<Habit[]>(habitKeys.list(date), newData);

      return {
        prevData,
      };
    },

    onError: (_err, data, context) => {
      const { date } = data;

      queryClient.setQueryData<Habit[]>(habitKeys.list(date), context?.prevData);
    },
  });
};

import { completeHabit, createHabit, deleteHabit, getHabits } from '@/api/habits';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

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
    mutationFn: completeHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
    // onSettled: () => {
    //   // Mutate cache to avoid invalidation
    //   queryClient.setQueryData(habitKeys.all, (old: Habit[]) => {
    //     return old.map((habit) => {
    //       if (habit.id === id) {
    //         return { ...habit, isCompleted: true };
    //       }
    //       return habit;
    //     });
    //   });
    // },
  });
};

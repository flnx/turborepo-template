import { api } from './api-client';

import type { CreateHabitWithSchedule, Habit } from '@repo/schemas/types/habit';

type HabitId = Pick<Habit, 'id'>;

export const getHabits = async () => api.get<Habit[]>('v1/habits');

export const createHabit = async (habit: CreateHabitWithSchedule) => {
  return api.post<HabitId>('v1/habits', habit);
};

export const deleteHabit = async (id: string) => {
  return api.delete(`v1/habits/${id}`);
};

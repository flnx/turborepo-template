import { api } from './api-client';

import type {
  CompleteHabit,
  CreateHabitWithSchedule,
  Habit,
} from '@repo/schemas/types/habit';

type HabitId = Pick<Habit, 'id'>;

export const getHabits = async (localDate: string) => {
  return api.get<Habit[]>(`v1/habits?date=${localDate}`);
};

export const createHabit = async (habit: CreateHabitWithSchedule) => {
  return api.post<HabitId>('v1/habits', habit);
};

export const deleteHabit = async (id: string) => {
  return api.delete<Promise<void>>(`v1/habits/${id}`);
};

export const completeHabit = async (data: CompleteHabit) => {
  return api.post<Promise<void>>(`v1/habits/${data.id}/complete`, data);
};

// import type { Habit } from '@/types/Habit';

import type { Habit } from '@repo/schemas/types/habit';

export const getHabits = async (): Promise<Habit[]> => {
  const response = await fetch('/api/habits');
  return response.json();
};

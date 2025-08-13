// import type { Habit } from '@/types/Habit';

import { supabase } from '@/utils/supabaseClient';
import { api } from './api-client';
import type { Habit } from '@repo/schemas/types/habit';

export const getHabits = async (): Promise<Habit[]> => {
  const { auth } = supabase;
  const token = (await auth.getSession()).data.session?.access_token;

  if (!token) {
    throw new Error('Unauthorized');
  }

  // Set the token in the API client
  api.setToken(token);

  try {
    const habits = await api.get<Habit[]>('/v1/habits');
    return habits;
  } catch (error) {
    console.error('Failed to fetch habits:', error);
    throw new Error('Failed to fetch habits');
  }
};

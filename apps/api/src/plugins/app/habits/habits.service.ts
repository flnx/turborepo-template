import { createService } from '@/utils/createService';

import type { TServiceContext } from '@/utils/createService';
import type { CreateHabit } from '@repo/schemas/types/habit';

export const getHabits = createService(async ({ supabase, user }) => {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
});

type CreateHabitParams = TServiceContext & {
  userData: CreateHabit;
};

export const createHabit = createService(
  async ({ supabase, userData }: CreateHabitParams) => {
    const { data, error, status } = await supabase
      .from('habits')
      .insert<CreateHabit>(userData);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error, status };
  },
);

import { createService } from '@/utils/createService';

import type { TCreateHabit } from '@/schemas/habits.schema';
import type { TServiceContext } from '@/utils/createService';

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
  userData: TCreateHabit;
};

export const createHabit = createService(
  async ({ supabase, userData }: CreateHabitParams) => {
    const { data, error, status } = await supabase
      .from('habits')
      .insert<TCreateHabit>(userData);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error, status };
  },
);

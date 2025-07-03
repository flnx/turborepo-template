import type { TCreateHabit } from '../../../schemas/habits.schema';
import {
  createService,
  type TServiceContext,
} from '../../../utils/createService';

export const getUserHabits = createService(async ({ supabase, user }) => {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
});

type CreateUserHabitsParams = TServiceContext & {
  userData: TCreateHabit;
};

export const createUserHabits = createService(
  async ({ supabase, userData }: CreateUserHabitsParams) => {
    const { data, error, status } = await supabase
      .from('habits')
      .insert<TCreateHabit>(userData);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error, status };
  }
);

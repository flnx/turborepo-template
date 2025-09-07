import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { createDatabaseError } from '@/utils/app-errors';
import { createService, ServiceContext } from '@/utils/createService';

import type {
  CompleteHabit,
  CreateHabitWithSchedule,
  Habit,
} from '@repo/schemas/types/habit';

declare module 'fastify' {
  export interface FastifyInstance {
    habitsRepository: ReturnType<typeof createRepository>;
  }
}

type GetAllForToday = ServiceContext & {
  body: { date: string };
};

type Create = ServiceContext & {
  body: CreateHabitWithSchedule;
};

type Remove = ServiceContext & {
  body: { id: string };
};

type Complete = ServiceContext & {
  body: CompleteHabit;
};

type Uncomplete = ServiceContext & {
  body: Pick<CompleteHabit, 'id' | 'date'>;
};

function createRepository(app: FastifyInstance) {
  const supabase = app.supabase;

  return {
    getAllForToday: createService(
      async ({ body, user }: GetAllForToday): Promise<Habit[]> => {
        const { data, error, status } = await supabase.rpc('get_habits_for_day', {
          p_date: body.date,
          p_user_id: user.id,
        });

        if (error) {
          throw createDatabaseError(error, status);
        }

        return data;
      },
    ),

    create: createService(async ({ body, user }: Create) => {
      const { habit, habit_schedule } = body;

      const { data, error, status } = await supabase.rpc('create_habit_with_schedule', {
        p_days_of_week: habit_schedule.days_of_week,
        p_description: habit.description,
        p_title: habit.title,
        p_user_id: user.id,
      });

      if (error) {
        throw createDatabaseError(error, status);
      }

      return {
        id: data,
      };
    }),

    remove: createService(async ({ body, user }: Remove) => {
      const { error, status } = await supabase
        .from('habits')
        .delete()
        .eq('id', body.id)
        .eq('user_id', user.id);

      if (error) {
        throw createDatabaseError(error, status);
      }

      return { success: true };
    }),

    complete: createService(async ({ body, user }: Complete) => {
      const { error, status } = await supabase.from('habit_completions').upsert({
        habit_id: body.id,
        completed_local_date: body.date,
        user_id: user.id,
      });

      if (error) {
        throw createDatabaseError(error, status);
      }

      return { success: true };
    }),

    uncomplete: createService(async ({ body, user }: Uncomplete) => {
      const { error, status } = await supabase
        .from('habit_completions')
        .delete()
        .eq('habit_id', body.id)
        .eq('completed_local_date', body.date)
        .eq('user_id', user.id);

      if (error) {
        throw createDatabaseError(error, status);
      }

      return { success: true };
    }),
  };
}

export default fp(
  function (fastify) {
    fastify.decorate('habitsRepository', createRepository(fastify));
  },
  {
    name: 'habits-repository',
  },
);

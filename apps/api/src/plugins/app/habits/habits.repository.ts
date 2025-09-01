import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { createDatabaseError } from '@/utils/app-errors';
import { createService, ServiceContext } from '@/utils/createService';

import type { CreateHabitWithSchedule, Habit } from '@repo/schemas/types/habit';

declare module 'fastify' {
  export interface FastifyInstance {
    habitsRepository: ReturnType<typeof createRepository>;
  }
}

type GetAll = ServiceContext & {
  body: { date: string };
};

type Create = ServiceContext & {
  body: CreateHabitWithSchedule;
};

type Delete = ServiceContext & {
  body: { id: string };
};

type Complete = ServiceContext & {
  body: { id: string; date: string };
};

function createRepository(_app: FastifyInstance) {
  return {
    getAll: createService(async ({ supabase, body }: GetAll): Promise<Habit[]> => {
      const { data, error, status } = await supabase.rpc('get_habits_for_day', {
        p_date: body.date,
      });

      if (error) {
        throw createDatabaseError(error, status);
      }

      return data;
    }),

    create: createService(async ({ supabase, body }: Create) => {
      const { habit, habit_schedule } = body;

      const { data, error, status } = await supabase.rpc('create_habit_with_schedule', {
        p_days_of_week: habit_schedule.days_of_week,
        p_description: habit.description,
        p_title: habit.title,
      });

      if (error) {
        throw createDatabaseError(error, status);
      }

      return {
        id: data,
      };
    }),

    delete: createService(async ({ supabase, body }: Delete) => {
      const { error, status } = await supabase.from('habits').delete().eq('id', body.id);

      if (error) {
        throw createDatabaseError(error, status);
      }

      return { success: true };
    }),

    complete: createService(async ({ supabase, body }: Complete) => {
      const { error, status } = await supabase.rpc('upsert_habit_completion' as any, {
        p_habit_id: body.id,
        p_completed_date: body.date,
      });
      // const { error, status } = await supabase.from('habit_completions').upsert(
      //   {
      //     habit_id: body.id,
      //     completed_local_date: body.date,
      //   },
      //   { onConflict: 'habit_id,completed_local_date' },
      // );

      if (error) {
        throw createDatabaseError(error, status);
      }

      console.log('error', error);

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

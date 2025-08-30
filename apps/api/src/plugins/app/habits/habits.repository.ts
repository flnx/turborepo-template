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

function createRepository(_app: FastifyInstance) {
  return {
    getAll: createService(async ({ supabase, user }) => {
      const { data, error, status } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        throw createDatabaseError(error, status);
      }

      return data as Habit[];
    }),

    create: createService(
      async ({ supabase, body }: ServiceContext & { body: CreateHabitWithSchedule }) => {
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
      },
    ),

    delete: createService(
      async ({ supabase, body }: ServiceContext & { body: { id: string } }) => {
        const { error, status } = await supabase
          .from('habits')
          .delete()
          .eq('id', body.id);

        if (error) {
          throw createDatabaseError(error, status);
        }

        return { success: true };
      },
    ),
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

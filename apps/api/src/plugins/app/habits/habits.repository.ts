import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { createDatabaseError } from '@/utils/app-errors';
import { createService, ServiceContext } from '@/utils/createService';

import type {
  CreateHabit,
  CreateHabitSchedule,
  CreateHabitWithSchedule,
  Habit,
} from '@repo/schemas/types/habit';

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
        const { data, error, status } = await supabase.rpc('create_habit_with_schedule', {
          p_habit: body.habit,
          p_schedule: body.habit_schedule,
        });

        // const habitData = await supabase
        //   .from('habits')
        //   .insert<CreateHabit>(body.habit)
        //   .select()
        //   .single();

        // if (habitData.error) {
        //   throw createDatabaseError(habitData.error, habitData.status);
        // }

        // const habitSchedule = await supabase
        //   .from('habit_schedules')
        //   .insert<CreateHabitSchedule & { habit_id: string }>({
        //     ...body.habit_schedule,
        //     habit_id: habitData.data.id,
        //   })
        //   .select()
        //   .single();

        // if (habitSchedule.error) {
        //   throw createDatabaseError(habitSchedule.error, habitSchedule.status);
        // }

        // return data;
      },
    ),

    // Example of how to add more methods
    // async getById(req: FastifyRequest<{ Params: { id: string } }>) {
    //   const { data, error } = await req.supabase
    //     .from('habits')
    //     .select('*')
    //     .eq('id', req.params.id)
    //     .eq('user_id', req.user.id)
    //     .single();

    //   if (error) {
    //     if (error.code === 'PGRST116') {
    //       // Not found error
    //       throw createNotFoundError('Habit not found');
    //     }
    //     throw createDatabaseError(error);
    //   }

    //   return data;
    // },

    //   async update(req: FastifyRequest<{ Params: { id: string }; Body: Partial<CreateHabit> }>) {
    //     const { data, error } = await req.supabase
    //       .from('habits')
    //       .update(req.body)
    //       .eq('id', req.params.id)
    //       .eq('user_id', req.user.id)
    //       .select()
    //       .single();

    //     if (error) {
    //       throw createDatabaseError(error);
    //     }

    //     return data;
    //   },

    //   async delete(req: FastifyRequest<{ Params: { id: string } }>) {
    //     const { error } = await req.supabase
    //       .from('habits')
    //       .delete()
    //       .eq('id', req.params.id)
    //       .eq('user_id', req.user.id);

    //     if (error) {
    //       throw createDatabaseError(error);
    //     }

    //     return { success: true };
    //   }
  };
}

export default fp(
  function (fastify) {
    fastify.decorate('habitsRepository', createRepository(fastify));
  },
  {
    name: 'habits-repository', // Fixed the name here
  },
);

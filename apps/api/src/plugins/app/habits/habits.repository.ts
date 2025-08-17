import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { createDatabaseError } from '@/utils/app-errors';
import { createService } from '@/utils/createService';

import type { CreateHabit, Habit } from '@repo/schemas/types/habit';

declare module 'fastify' {
  export interface FastifyInstance {
    habitsRepository: ReturnType<typeof createRepository>;
  }
}

function createRepository(_app: FastifyInstance) {
  return {
    getAll: createService(async ({ supabase, user }) => {
      const { data, error, status, statusText } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        throw createDatabaseError(error, status);
      }

      return data as Habit[];
    }),

    // async create(req: FastifyRequest<{ Body: CreateHabit }>) {
    //   const { data, error } = await req.supabase
    //     .from('habits')
    //     .insert<CreateHabit>(req.body)
    //     .select()
    //     .single();

    //   if (error) {
    //     throw createDatabaseError(error);
    //   }

    //   return data;
    // },

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

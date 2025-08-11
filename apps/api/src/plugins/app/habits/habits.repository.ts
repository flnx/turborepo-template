import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { createHabit, getHabits } from './habits.service';

import type { CreateHabit } from '@repo/schemas/types/habit';

declare module 'fastify' {
  export interface FastifyInstance {
    habitsRepository: ReturnType<typeof createRepository>;
  }
}

function createRepository(_app: FastifyInstance) {
  return {
    getAll: (req: FastifyRequest) => getHabits({ supabase: req.supabase, user: req.user }),

    create: (req: FastifyRequest<{ Body: CreateHabit }>) =>
      createHabit({
        supabase: req.supabase,
        user: req.user,
        userData: req.body,
      }),
  };
}

export default fp(
  function (fastify) {
    fastify.decorate('habitsRepository', createRepository(fastify));
  },
  {
    name: 'tasks-repository',
  },
);

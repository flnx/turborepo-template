import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { getUserHabits } from './habits.service';

declare module 'fastify' {
  export interface FastifyInstance {
    habitsRepository: ReturnType<typeof createRepository>;
  }
}

function createRepository(_app: FastifyInstance) {
  return {
    async getUserHabits(req: FastifyRequest) {
      return getUserHabits({ supabase: req.supabase, user: req.user });
    },
  };
}

export default fp(
  function (fastify) {
    fastify.decorate('habitsRepository', createRepository(fastify));
  },
  {
    name: 'tasks-repository',
  }
);

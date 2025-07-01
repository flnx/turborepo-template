import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  export interface FastifyInstance {
    habitsRepository: ReturnType<typeof createRepository>;
  }
}

function createRepository(app: FastifyInstance) {
  return {
    async getUserHabits(req: FastifyRequest) {
      const { supabase, user } = req;

      console.log(user);

      return [
        {
          id: 1,
          title: 'running',
        },
        {
          id: 2,
          title: 'boxing',
        },
      ];
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

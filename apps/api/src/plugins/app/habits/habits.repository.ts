import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { createUserHabits, getUserHabits } from './habits.service';
import type { TCreateHabit } from '../../../schemas/habits.schema';

declare module 'fastify' {
  export interface FastifyInstance {
    habitsRepository: ReturnType<typeof createRepository>;
  }
}

function createRepository(_app: FastifyInstance) {
  async function getUserHabitsHandler(req: FastifyRequest) {
    return getUserHabits({ supabase: req.supabase, user: req.user });
  }

  async function createUserHabitsHandler(req: FastifyRequest<{ Body: TCreateHabit }>) {
    return createUserHabits({
      supabase: req.supabase,
      user: req.user,
      userData: req.body,
    });
  }

  return {
    getUserHabitsHandler,
    createUserHabitsHandler,
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

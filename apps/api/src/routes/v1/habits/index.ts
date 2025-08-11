import { FastifyInstance } from 'fastify';

import { createHabitJSONSchema } from '@/schemas/habits.schema';

import type { CreateHabit } from '@repo/schemas/types/habit';

type CreateHabitRoute = {
  Body: CreateHabit;
};

export default async function habitRoutes(app: FastifyInstance) {
  const { getAll, create } = app.habitsRepository;

  app.get('/', async (req, _reply) => getAll(req));

  app.post<CreateHabitRoute>('/', {
    handler: async (req, _reply) => create(req),
    schema: {
      body: createHabitJSONSchema,
    },
  });
}

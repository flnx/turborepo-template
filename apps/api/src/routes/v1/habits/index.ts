import { FastifyInstance } from 'fastify';

import { habitsSchema } from '@/schemas/habits.schema';

import type { CreateHabit } from '@repo/schemas/types/habit';

type CreateHabitRoute = {
  Body: CreateHabit;
};

export default async function habitRoutes(app: FastifyInstance) {
  const { getAll } = app.habitsRepository;

  app.get('/', {
    handler: async (req) =>
      getAll({
        supabase: req.supabase,
        user: req.user,
      }),
    schema: {
      response: {
        200: habitsSchema,
      },
    },
  });

  // app.post<CreateHabitRoute>('/', {
  //   handler: async (req, _reply) => create(req),
  //   schema: {
  //     body: createHabitJSONSchema,
  //   },
  // });
}

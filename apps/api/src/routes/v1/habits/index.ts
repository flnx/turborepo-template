import { FastifyInstance } from 'fastify';

import { createHabitWithScheduleJSONSchema, habitsSchema } from '@/schemas/habits.schema';

import type { CreateHabitWithSchedule } from '@repo/schemas/types/habit';

type CreateHabitRoute = {
  Body: CreateHabitWithSchedule;
};

export default async function habitRoutes(app: FastifyInstance) {
  const { getAll, create } = app.habitsRepository;

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

  app.post<CreateHabitRoute>('/', {
    handler: async (req, _reply) =>
      create({
        supabase: req.supabase,
        user: req.user,
        body: req.body,
      }),
    schema: {
      body: createHabitWithScheduleJSONSchema,
    },
  });
}

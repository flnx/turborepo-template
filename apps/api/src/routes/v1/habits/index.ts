import { FastifyInstance } from 'fastify';

import {
  createHabitWithScheduleJSONSchema,
  deleteHabitJSONSchema,
  deleteHabitResponseJSONSchema,
  habitsSchema,
} from '@/schemas/habits.schema';

import type { CreateHabitWithSchedule } from '@repo/schemas/types/habit';

type CreateHabitRoute = {
  Body: CreateHabitWithSchedule;
};

type DeleteHabitRoute = {
  Params: { id: string };
};

export default async function habitRoutes(app: FastifyInstance) {
  const { getAll, create, delete: deleteHabit } = app.habitsRepository;

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

  app.delete<DeleteHabitRoute>('/:id', {
    handler: async (req, reply) => {
      await deleteHabit({
        supabase: req.supabase,
        user: req.user,
        body: { id: req.params.id },
      });

      reply.code(204).send();
    },
    schema: {
      params: deleteHabitJSONSchema,
      response: {
        204: deleteHabitResponseJSONSchema,
      },
    },
  });
}

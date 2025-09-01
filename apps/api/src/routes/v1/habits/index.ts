import { FastifyInstance } from 'fastify';

import {
  completeHabitJSONSchema,
  createHabitWithScheduleJSONSchema,
  dateQueryParamsJSONSchema,
  habitsSchema,
  noContentResponseSchema,
  uuidParamsJSONSchema,
} from '@/schemas/habits.schema';

import type { CompleteHabit, CreateHabitWithSchedule } from '@repo/schemas/types/habit';

type CreateHabitRoute = {
  Body: CreateHabitWithSchedule;
};

type DeleteHabitRoute = {
  Params: { id: string };
};

type GetHabitsRoute = {
  Querystring: { date: string };
};

type CompleteHabitRoute = DeleteHabitRoute & {
  Body: CompleteHabit;
};

export default async function habitRoutes(app: FastifyInstance) {
  const { getAll, create, delete: deleteHabit, complete } = app.habitsRepository;

  app.get<GetHabitsRoute>('/', {
    handler: async (req) =>
      getAll({
        supabase: req.supabase,
        user: req.user,
        body: req.query,
      }),
    schema: {
      querystring: dateQueryParamsJSONSchema,
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
      params: uuidParamsJSONSchema,
      response: {
        204: noContentResponseSchema,
      },
    },
  });

  app.post<CompleteHabitRoute>('/:id/complete', {
    handler: async (req, reply) => {
      await complete({
        supabase: req.supabase,
        user: req.user,
        body: req.body,
      });

      reply.code(201).send();
    },
    schema: {
      body: completeHabitJSONSchema,
      params: uuidParamsJSONSchema,
      response: {
        204: noContentResponseSchema,
      },
    },
  });
}

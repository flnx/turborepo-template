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

type GetAllForTodayRoute = {
  Querystring: { date: string };
};

type CompleteHabitRoute = {
  Params: { id: string };
  Body: CompleteHabit;
};

export default async function habitRoutes(app: FastifyInstance) {
  const { getAllForToday, create, remove, complete } = app.habitsRepository;

  app.get<GetAllForTodayRoute>('/', {
    handler: async (req) =>
      getAllForToday({
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
        user: req.user,
        body: req.body,
      }),

    schema: {
      body: createHabitWithScheduleJSONSchema,
    },
  });

  app.delete<DeleteHabitRoute>('/:id', {
    handler: async (req, reply) => {
      await remove({
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

import { FastifyInstance } from 'fastify';
import {
  TCreateHabit,
  createHabitJSONSchema,
} from '../../../schemas/habits.schema';

type CreateHabitRoute = {
  Body: TCreateHabit;
};

export default async function habitRoutes(app: FastifyInstance) {
  const { getUserHabitsHandler, createUserHabitsHandler } =
    app.habitsRepository;

  app.get('/', async (req, reply) => {
    // controller logic here in future
    const result = await getUserHabitsHandler(req);

    return result;
  });

  app.post<CreateHabitRoute>('/', {
    handler: async (req, reply) => {
      const data = createUserHabitsHandler(req);

      return data;
    },
    schema: {
      body: createHabitJSONSchema,
    },
  });
}

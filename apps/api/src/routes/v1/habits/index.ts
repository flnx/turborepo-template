import { FastifyInstance } from 'fastify';
import { getUserHabitsHandler } from '../../../controllers/habits.controller';
import { habitJSONSchema } from '../../../schemas/habits.schema';

export default async function habitRoutes(app: FastifyInstance) {
  const { getUserHabits } = app.habitsRepository;

  app.get('/', {}, async (req, reply) => {
    // controller logic here in future
    const result = await getUserHabits(req);

    return result;
  });

  app.post('/', {
    handler: getUserHabitsHandler,
    schema: {
      body: habitJSONSchema,
    },
  });
}

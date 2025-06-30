import { FastifyInstance } from 'fastify';
import { getUserHabitsHandler } from '../../../controllers/habits.controller';
import { habitJSONSchema } from '../../../schemas/habits.schema';

export default async function habitRoutes(app: FastifyInstance) {
  app.get('/', getUserHabitsHandler);

  app.post('/', {
    handler: getUserHabitsHandler,
    schema: {
      body: habitJSONSchema,
    },
  });
}

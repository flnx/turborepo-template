import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserHabits } from '../services/habits.service';

export async function getUserHabitsHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  //  reply.code(201).send({
  //     message: true,
  //   })
  const userHabits = await getUserHabits();

  // app.get<{ Params: { id: string } }>('/habits:id', {
  //   handler: getUserHabits,
  // });

  return userHabits;
}

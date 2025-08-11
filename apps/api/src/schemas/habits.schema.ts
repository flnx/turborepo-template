import { z } from 'zod/v4';
import { CreateHabitSchema } from '@repo/schemas/schemas/habit'

export const createHabitJSONSchema = z.toJSONSchema(CreateHabitSchema, {
  target: 'draft-7',
  unrepresentable: 'any',
});

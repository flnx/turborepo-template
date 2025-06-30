import { z } from 'zod/v4';

const RepeatDaysSchema = z.array(z.number().min(0).max(6)).nonempty();

const CreateHabitSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    repeat: RepeatDaysSchema,
    description: z.string().optional(),
  })
  .meta({ $id: 'habit' });

export const habitJSONSchema = z.toJSONSchema(CreateHabitSchema, {
  target: 'draft-7',
  unrepresentable: 'any',
});

import { z } from 'zod/v4';

const RepeatDaysSchema = z.array(z.number().min(0).max(6)).nonempty();

const CreateHabitSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    // repeat: RepeatDaysSchema,
  })
  .meta({ $id: 'habit' });

export type TCreateHabit = z.infer<typeof CreateHabitSchema>;

export const createHabitJSONSchema = z.toJSONSchema(CreateHabitSchema, {
  target: 'draft-7',
  unrepresentable: 'any',
});

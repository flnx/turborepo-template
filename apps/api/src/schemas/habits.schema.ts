import {
  CreateHabitSchema,
  CreateHabitWithScheduleSchema,
  HabitSchema,
} from '@repo/schemas/schemas/habit';
import { z } from 'zod/v4';

export const createHabitJSONSchema = z.toJSONSchema(CreateHabitSchema, {
  target: 'draft-7',
  unrepresentable: 'any',
});
export const createHabitWithScheduleJSONSchema = z.toJSONSchema(
  CreateHabitWithScheduleSchema,
  {
    target: 'draft-7',
    unrepresentable: 'any',
  },
);

export const habitSchema = z.toJSONSchema(HabitSchema, {
  target: 'draft-7',
  unrepresentable: 'any',
});

export const habitsSchema = z.toJSONSchema(z.array(HabitSchema), {
  target: 'draft-7',
  unrepresentable: 'any',
});

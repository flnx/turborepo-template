import {
  CompleteHabitSchema,
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

export const uuidParamsJSONSchema = z.toJSONSchema(z.object({ id: z.uuidv4() }), {
  target: 'draft-7',
  unrepresentable: 'any',
});

export const noContentResponseSchema = z.toJSONSchema(z.null(), {
  target: 'draft-7',
  unrepresentable: 'any',
});

export const completeHabitJSONSchema = z.toJSONSchema(CompleteHabitSchema, {
  target: 'draft-7',
  unrepresentable: 'any',
});

export const dateQueryParamsJSONSchema = z.toJSONSchema(z.object({ date: z.date() }), {
  target: 'draft-7',
  unrepresentable: 'any',
});

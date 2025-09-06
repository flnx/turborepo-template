import { z } from "zod/v4";

// Habit
export const CreateHabitSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
  })
  .meta({ $id: "create-habit" });

export const HabitSchema = CreateHabitSchema.extend({
  id: z.uuidv4(),
  created_at: z.string(),
  user_id: z.string(),
  is_completed: z.boolean(),
  days_of_week: z.array(z.number()),
  current_streak: z.number(),
  longest_streak: z.number(),
}).meta({ $id: "habit" });

// Habit Schedule
const CreateHabitScheduleSchema = z
  .object({
    days_of_week: z.array(z.number()),
  })
  .meta({ $id: "create-habit-schedule" });

// Habit With Schedule
export const CreateHabitWithScheduleSchema = z
  .object({
    habit: CreateHabitSchema,
    habit_schedule: CreateHabitScheduleSchema,
  })
  .meta({ $id: "create-habit-with-schedule" });

// Habit completion
export const CompleteHabitSchema = z
  .object({
    id: z.uuidv4(),
    date: z.iso.date(),
  })
  .meta({ $id: "complete-habit" });

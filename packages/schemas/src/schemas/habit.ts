import { z } from "zod/v4";

// Habit
export const CreateHabitSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
  })
  .meta({ $id: "create-habit" });

export const HabitSchema = CreateHabitSchema.extend({
  id: z.string(),
  created_at: z.string(),
  user_id: z.string(),
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

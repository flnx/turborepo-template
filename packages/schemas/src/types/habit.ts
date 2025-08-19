import { z } from "zod";
import {
  CreateHabitSchema,
  HabitSchema,
  CreateHabitScheduleSchema,
  HabitScheduleSchema,
  CreateHabitWithScheduleSchema,
} from "../schemas/habit";

export type CreateHabit = z.infer<typeof CreateHabitSchema>;
export type Habit = z.infer<typeof HabitSchema>;
export type CreateHabitSchedule = z.infer<typeof CreateHabitScheduleSchema>;
export type HabitSchedule = z.infer<typeof HabitScheduleSchema>;
export type CreateHabitWithSchedule = z.infer<typeof CreateHabitWithScheduleSchema>;

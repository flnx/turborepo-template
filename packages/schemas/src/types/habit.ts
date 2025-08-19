import { z } from "zod";
import {
  CreateHabitSchema,
  HabitSchema,
  CreateHabitWithScheduleSchema,
} from "../schemas/habit";

export type CreateHabit = z.infer<typeof CreateHabitSchema>;
export type Habit = z.infer<typeof HabitSchema>;
export type CreateHabitWithSchedule = z.infer<typeof CreateHabitWithScheduleSchema>;

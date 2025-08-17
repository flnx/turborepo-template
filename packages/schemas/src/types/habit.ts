import { z } from "zod";
import { CreateHabitSchema, HabitSchema } from "../schemas/habit";

export type CreateHabit = z.infer<typeof CreateHabitSchema>;
export type Habit = z.infer<typeof HabitSchema>;

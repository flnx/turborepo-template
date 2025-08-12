import { z } from "zod";
import { CreateHabitSchema } from "../schemas/habit";

export type CreateHabit = z.infer<typeof CreateHabitSchema>;

export type Habit = CreateHabit & {
  id: string;
  created_at: Date;
  user_id: string;
};

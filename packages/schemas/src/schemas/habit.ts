import { z } from "zod/v4";

export const CreateHabitSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().nullable(),
  })
  .meta({ $id: "create-habit" });

export const HabitSchema = CreateHabitSchema.extend({
  id: z.string(),
  created_at: z.string(),
  user_id: z.string(),
}).meta({ $id: "habit" });
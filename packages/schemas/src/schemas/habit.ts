import { z } from "zod/v4";

export const CreateHabitSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
}).meta({ $id: "habit" });
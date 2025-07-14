import z from "zod";
import { entitySchema } from "./entity-schema";
import { userSchema } from "./user-schema";

export const templateItemSchema = z.object({
  label: z.string().trim().min(3).max(50),
  description: z.string().trim().min(3).max(50).nullable(),
  weight: z.number().min(1).max(5),
  order: z.number(),
});

export const templateSchema = entitySchema.extend({
  title: z.string().trim().min(3).max(50),
  description: z.string().trim().min(3).max(50).nullable(),
  creator: userSchema,
  items: z.array(templateItemSchema),
});

export interface Template extends z.infer<typeof templateSchema> {}

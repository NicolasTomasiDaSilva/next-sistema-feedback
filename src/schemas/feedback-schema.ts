import z from "zod";
import { entitySchema } from "./entity-schema";
import { templateItemSchema } from "./template-schema";
import { userSchema } from "./user-schema";

export const feedbackItemSchema = templateItemSchema.extend({
  score: z.number().min(1).max(10),
  observation: z.string().trim().min(3).max(50).nullable(),
});

export const feedbackSchema = entitySchema.extend({
  title: z.string().trim().min(3).max(50),
  description: z.string().trim().min(3).max(50).nullable(),
  observation: z.string().trim().min(3).max(50).nullable(),
  receiver: userSchema,
  giver: userSchema,
  score: z.number().min(1).max(100),
  items: z.array(feedbackItemSchema),
});

import z from "zod";
import { entitySchema } from "./entity-schema";
import { userSchema } from "./user-schema";

export const templateItemSchema = z.object({
  label: z.string().trim().min(3).max(50),
  description: z.string().trim().min(3).max(50).nullable(),
  weight: z.number().min(1).max(5),
  order: z.number(),
});

export type TemplateItem = z.infer<typeof templateItemSchema>;

export const templateSchema = entitySchema.extend({
  title: z.string().trim().min(3).max(50),
  description: z.string().trim().min(3).max(50).nullable(),
  creator: userSchema,
  items: z.array(templateItemSchema).optional(),
});

export type Template = z.infer<typeof templateSchema>;

export const templateFormSchema = templateSchema.pick({
  title: true,
  description: true,
  items: true,
});

export type TemplateForm = z.infer<typeof templateFormSchema>;

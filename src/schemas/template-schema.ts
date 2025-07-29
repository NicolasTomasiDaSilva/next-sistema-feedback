import z, { string } from "zod";
import { entitySchema } from "./entity-schema";
import { userSchema } from "./user-schema";
import { zString } from "./values";

export const templateItemSchema = z.object({
  label: zString({ field: "Título", min: 3, max: 50 }),
  description: zString({ field: "Descrição", min: 3, max: 50, nullable: true }),
  weight: z.number().min(1).max(5),
  order: z.number(),
});

export type TemplateItem = z.infer<typeof templateItemSchema>;

export const templateSchema = entitySchema.extend({
  title: zString({ field: "Título", min: 3, max: 50 }),
  description: zString({ field: "Descrição", min: 3, max: 50, nullable: true }),
  creator: userSchema,
  items: z.array(templateItemSchema).min(1).optional(),
});

export type Template = z.infer<typeof templateSchema>;

export const templateFormSchema = templateSchema.pick({
  title: true,
  description: true,
  items: true,
});

export type TemplateForm = z.infer<typeof templateFormSchema>;

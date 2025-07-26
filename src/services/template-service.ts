import { api } from "@/lib/api/api";
import { Template, templateSchema } from "@/schemas/template-schema";
import z from "zod";

export class TemplateService {
  static async getTemplates(): Promise<Template[]> {
    return (await api.get({
      url: "/templates",
      params: {
        page: 1,
        perPage: 5,
      },
      schema: z.array(templateSchema),
    })) as Template[];
  }
}

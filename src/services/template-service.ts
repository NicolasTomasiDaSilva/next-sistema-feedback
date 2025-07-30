import { api } from "@/lib/api/api";
import {
  Template,
  TemplateForm,
  templateSchema,
} from "@/schemas/template-schema";
import z from "zod";

export class TemplateService {
  static async getTemplate(id: string): Promise<Template> {
    return (await api.get({
      url: `/templates/${id}`,
      schema: templateSchema,
    })) as Template;
  }

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
  static async createTemplate(template: TemplateForm): Promise<Template> {
    return (await api.post({
      url: "/templates",
      data: template,
      schema: templateSchema,
    })) as Template;
  }

  static async updateTemplate(
    template: TemplateForm,
    id: string
  ): Promise<Template> {
    return (await api.put({
      url: `/templates/${id}`,
      data: template,
      schema: templateSchema,
    })) as Template;
  }
}

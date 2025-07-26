import { api } from "@/lib/api/api";
import { templateSchema } from "@/schemas/template-schema";
import z from "zod";

class TemplateService {
  static async getTemplates() {
    return api.get({
      url: "/templates",
      schema: z.array(templateSchema),
      params: {
        page: 1,
        limit: 10,
      },
    });
  }
}

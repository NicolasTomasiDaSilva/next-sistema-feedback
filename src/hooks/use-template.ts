import { useTemplateContext } from "@/contexts/template-context";
import { Template, TemplateForm } from "@/schemas/template-schema";
import { TemplateService } from "@/services/template-service";
import { useContext } from "react";

export function useTemplate() {
  const { templates, setTemplates } = useTemplateContext();

  async function createTemplate(values: TemplateForm) {
    const template = await TemplateService.createTemplate(values);
    setTemplates([...templates, template]);
  }

  async function updateTemplate(values: TemplateForm, id: string) {
    const template = await TemplateService.updateTemplate(values, id);
    setTemplates((prevTemplates) => {
      const index = prevTemplates.findIndex((t) => t.id === id);
      if (index === -1) return prevTemplates;
      const newTemplates = [...prevTemplates];
      newTemplates[index] = template;
      return newTemplates;
    });
  }

  return { templates, setTemplates, createTemplate, updateTemplate };
}

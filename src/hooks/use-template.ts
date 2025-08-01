import { useTemplateContext } from "@/contexts/template-context";
import { Template, TemplateForm } from "@/schemas/template-schema";
import { TemplateService } from "@/services/template-service";
import { useContext } from "react";

export function useTemplate() {
  const { isLoading, setIsLoading, templates, setTemplates } =
    useTemplateContext();

  async function createTemplate(values: TemplateForm) {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const template = await TemplateService.createTemplate(values);
      setTemplates([...templates, template]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function updateTemplate(values: TemplateForm, id: string) {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const template = await TemplateService.updateTemplate(values, id);
      setTemplates((prevTemplates) => {
        const index = prevTemplates.findIndex((t) => t.id === id);
        if (index === -1) return prevTemplates;
        const newTemplates = [...prevTemplates];
        newTemplates[index] = template;
        return newTemplates;
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    setIsLoading,
    templates,
    setTemplates,
    createTemplate,
    updateTemplate,
  };
}

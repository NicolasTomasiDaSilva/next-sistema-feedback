"use client";

import { CardTemplate } from "@/components/template/template-card";
import { TemplateDialogForm } from "@/components/template/template-dialog";
import { TemplateProvider } from "@/contexts/template-context";
import { useTemplate } from "@/hooks/use-template";
import { TemplateService } from "@/services/template-service";
import { useEffect } from "react";

export default function TemplateContent() {
  const { templates, setTemplates, createTemplate } = useTemplate();

  useEffect(() => {
    async function fetchTemplates() {
      const templates = await TemplateService.getTemplates();
      setTemplates(templates);
    }

    fetchTemplates();
  }, []);

  return (
    <>
      <TemplateDialogForm className="ml-auto" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <CardTemplate key={template.id} template={template}></CardTemplate>
        ))}
      </div>
    </>
  );
}

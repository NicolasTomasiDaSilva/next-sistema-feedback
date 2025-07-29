"use client";

import { CardTemplate } from "@/components/template-card";
import { TemplateDialogForm } from "@/components/template-dialog";
import { Button } from "@/components/ui/button";
import { Template } from "@/schemas/template-schema";
import { TemplateService } from "@/services/template-service";
import { useEffect, useState } from "react";

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  useEffect(() => {
    async function fetchTemplates() {
      const templates = await TemplateService.getTemplates();
      setTemplates(templates);
    }

    fetchTemplates();
  }, []);
  return (
    <>
      <TemplateDialogForm onSubmit={async () => {}} className="ml-auto" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <CardTemplate key={template.id} template={template}></CardTemplate>
        ))}
      </div>
    </>
  );
}

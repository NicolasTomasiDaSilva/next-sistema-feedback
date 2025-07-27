"use client";

import { CardTemplate } from "@/components/template-card";
import { Button } from "@/components/ui/button";
import { Template } from "@/schemas/template-schema";
import { TemplateService } from "@/services/template-service";
import { Plus } from "lucide-react";
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
      <Button className="ml-auto">
        <Plus className="size-3" />
        Adicionar Template
      </Button>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <CardTemplate key={template.id} template={template}></CardTemplate>
        ))}
      </div>
    </>
  );
}

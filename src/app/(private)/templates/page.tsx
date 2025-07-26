"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Template } from "@/schemas/template-schema";
import { TemplateService } from "@/services/template-service";
import { Eye, Plus } from "lucide-react";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card className="w-full" key={template.id}>
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>
                12 items • Criado por {template.creator.name}
              </CardDescription>
              <CardAction>
                <Button>
                  <Eye className="size-3" />
                  Ver
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias,
                exercitationem! Obcaecati impedit vel facere itaque sed, quis
                iure et dolorum, minima debitis sapiente dicta soluta odio
                aliquid! Labore, quasi ut?
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

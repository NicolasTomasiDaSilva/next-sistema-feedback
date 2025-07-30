import { Template } from "@/schemas/template-schema";
import { createContext, useContext, useState } from "react";

const TemplateContext = createContext<{
  templates: Template[];
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
} | null>(null);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [templates, setTemplates] = useState<Template[]>([]);

  return (
    <TemplateContext.Provider value={{ templates, setTemplates }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplateContext() {
  const ctx = useContext(TemplateContext);
  if (!ctx)
    throw new Error("useTemplateContext must be used within TemplateProvider");
  return ctx;
}

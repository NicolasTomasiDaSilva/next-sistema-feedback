import { Template } from "@/schemas/template-schema";
import { createContext, useContext, useState } from "react";

const TemplateContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  templates: Template[];
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
} | null>(null);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);

  return (
    <TemplateContext.Provider
      value={{
        isLoading,
        setIsLoading,
        templates,
        setTemplates,
      }}
    >
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

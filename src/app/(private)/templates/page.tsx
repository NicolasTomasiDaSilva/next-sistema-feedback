"use client";
import TemplateContent from "@/components/template/template-content";
import { TemplateProvider } from "@/contexts/template-context";

export default function Templates() {
  return (
    <TemplateProvider>
      <TemplateContent />
    </TemplateProvider>
  );
}

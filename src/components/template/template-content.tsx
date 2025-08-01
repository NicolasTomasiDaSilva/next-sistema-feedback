"use client";
import { CardTemplate } from "@/components/template/template-card";
import { TemplateDialogForm } from "@/components/template/template-dialog";
import { usePaginationWithFetch } from "@/hooks/use-pagination-with-fetch";
import { useTemplate } from "@/hooks/use-template";
import { TemplateService } from "@/services/template-service";
import { Pagination } from "../pagination";
import { Template } from "@/schemas/template-schema";

export default function TemplateContent() {
  const { templates, setTemplates } = useTemplate();
  const { page, isLoading, hasNextPage, next, prev, params, setParams } =
    usePaginationWithFetch<Template, { templateName?: string }>(
      {
        fetcher: TemplateService.getTemplates,
        initialParams: {},
        perPageDefault: 6,
      },
      setTemplates
    );

  return (
    <>
      <TemplateDialogForm className="ml-auto" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <CardTemplate key={template.id} template={template}></CardTemplate>
        ))}
      </div>
      {!isLoading && (
        <Pagination
          page={page}
          prev={prev}
          next={next}
          hasNextPage={hasNextPage}
        />
      )}
    </>
  );
}

"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { TemplateForm, templateFormSchema } from "@/schemas/template-schema";

interface TemplateDialogFormProps {
  defaultValues?: TemplateForm;
  onSubmit: (values: TemplateForm) => void;
}

export function TemplateDialogForm({
  defaultValues,
  onSubmit,
}: TemplateDialogFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<TemplateForm>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: null,
      items: [],
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{defaultValues ? "Editar Template" : "Novo Template"}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Editar Template" : "Criar Template"}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

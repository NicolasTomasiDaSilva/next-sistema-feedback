"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleFormSubmit = (values: TemplateForm) => {
    onSubmit(values);
    setOpen(false);
  };

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

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Itens</Label>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    label: "",
                    description: null,
                    weight: 1,
                    order: fields.length + 1,
                  })
                }
              >
                Adicionar Item
              </Button>
            </div>

            <ScrollArea className="h-64 border rounded-md p-2">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-md p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">
                        Item #{index + 1}
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => remove(index)}
                      >
                        Remover
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Label</Label>
                        <Input {...register(`items.${index}.label`)} />
                      </div>

                      <div>
                        <Label>Descrição</Label>
                        <Input {...register(`items.${index}.description`)} />
                      </div>

                      <div>
                        <Label>Peso</Label>
                        <Input
                          type="number"
                          {...register(`items.${index}.weight`, {
                            valueAsNumber: true,
                          })}
                        />
                      </div>

                      <div>
                        <Label>Ordem</Label>
                        <Input
                          type="number"
                          {...register(`items.${index}.order`, {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            {errors.items && (
              <p className="text-sm text-red-500">
                Você precisa de pelo menos um item.
              </p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit">
              {defaultValues ? "Salvar Alterações" : "Criar Template"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

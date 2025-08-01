"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription, // Adicionado para a descrição
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Para o campo de descrição
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Template,
  TemplateForm,
  templateFormSchema,
} from "@/schemas/template-schema";
import { Pencil, PlusCircle, Save, SaveAll } from "lucide-react"; // Ícones para adicionar/remover
import { TemplateItemCard } from "./template-item-card";
import { TemplateService } from "@/services/template-service";
import { ScrollArea } from "../ui/scroll-area";
import { useTemplate } from "@/hooks/use-template";

interface TemplateDialogFormProps {
  id?: string;
  className?: string;
}

export function TemplateDialogForm({ id, className }: TemplateDialogFormProps) {
  const [open, setOpen] = useState(false);
  const { isLoading, setIsLoading, createTemplate, updateTemplate } =
    useTemplate();

  const form = useForm<TemplateForm>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      title: "",
      description: "",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const handleFormSubmit = async (values: TemplateForm) => {
    if (id) {
      await updateTemplate(values, id);
    } else {
      await createTemplate(values);
    }
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    if (!open || !id) {
      return;
    }

    setIsLoading(true);

    TemplateService.getTemplate(id)
      .then((template) => {
        form.reset({
          title: template.title,
          description: template.description,
          items: template.items,
        });
      })
      .finally(() => setIsLoading(false));
  }, [open, id, form]);

  const isEditing = !!id;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className={className} variant={isEditing ? "ghost" : "default"}>
          {isEditing ? (
            <Pencil className="size-3" />
          ) : (
            <PlusCircle className="size-3" />
          )}
          {isEditing ? null : "Adicionar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Modelo" : "Adicionar Modelo"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edite seu modelo de avaliação"
              : "Adicione um modelo de avaliação"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          <Form {...form}>
            <form
              id="template-form"
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Itens</FormLabel>
                <div className="mt-2 space-y-3">
                  {fields.map((field, index) => (
                    <TemplateItemCard
                      key={field.id}
                      index={index}
                      remove={remove}
                      field={field}
                      form={form}
                    />
                  ))}
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({ label: "", description: "", weight: 1, order: 1 })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Item
              </Button>
              {form.formState.errors.items?.message && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {form.formState.errors.items.message}
                </p>
              )}
              {form.formState.errors.items?.root?.message && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {form.formState.errors.items.root.message}
                </p>
              )}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="template-form" disabled={isLoading}>
            {isEditing ? (
              <Save className="size-3" />
            ) : (
              <PlusCircle className="size-3" />
            )}
            {isEditing ? "Salvar alterações" : "Adicionar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

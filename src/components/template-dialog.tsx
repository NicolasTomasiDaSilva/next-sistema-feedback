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
import { useState } from "react";
import { TemplateForm, templateFormSchema } from "@/schemas/template-schema";
import { PlusCircle, Trash2 } from "lucide-react"; // Ícones para adicionar/remover

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
      description: "", // Recomendo usar string vazia para o campo controlado
      items: [], // Começar com um item vazio
    },
  });

  // Hook para gerenciar os campos dinâmicos
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const handleFormSubmit = (values: TemplateForm) => {
    onSubmit(values); // Chama a função passada por props
    form.reset(); // Limpa o formulário
    setOpen(false); // Fecha o dialog
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
          <DialogDescription>
            Crie um modelo de checklist para reutilizar em suas tarefas.
          </DialogDescription>
        </DialogHeader>

        {/* O componente Form do shadcn provê o contexto */}
        <Form {...form}>
          <form
            id="template-form" // ID para o botão de submit do footer funcionar
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            {/* Campo Título */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Checklist de Onboarding"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o objetivo deste template..."
                      {...field}
                      value={field.value ?? ""} // Garante que o valor não seja null
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* --- Campos Dinâmicos (Checklist) --- */}
            <div>
              <FormLabel>Itens da Checklist</FormLabel>
              <div className="mt-2 space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.label`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder={`Item ${index + 1}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button" // Importante para não submeter o form
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 1} // Não permite remover o último item
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="button" // Importante para não submeter o form
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() =>
                append({ label: "", description: "", weight: 1, order: 1 })
              } // Adiciona um novo item vazio
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Item
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="submit"
            form="template-form" // Associa o botão ao formulário
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

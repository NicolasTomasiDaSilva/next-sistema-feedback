import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { TemplateForm, TemplateItem } from "@/schemas/template-schema";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const levels = [1, 2, 3, 4, 5];

interface TemplateItemCardProps {
  index: number;
  remove: UseFieldArrayRemove;
  field: FieldArrayWithId<TemplateItem>;
  form: UseFormReturn<TemplateForm>;
}
export function TemplateItemCard({
  index,
  remove,
  field,
  form,
}: TemplateItemCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Item {index + 1}</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name={`items.${index}.label`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder={`Item ${index + 1}`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`items.${index}.description`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Descrição do item ${index + 1}`}
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
          name={`items.${index}.weight`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar peso" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((weight) => (
                    <SelectItem key={weight} value={weight.toString()}>
                      Peso {weight}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

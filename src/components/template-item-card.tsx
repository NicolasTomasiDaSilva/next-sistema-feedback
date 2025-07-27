import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { TemplateForm, TemplateItem } from "@/schemas/template-schema";

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
    <div className="flex items-center gap-2">
      <FormField
        control={form.control}
        name={`items.${index}.label`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input placeholder={`Item ${index + 1}`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        onClick={() => remove(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

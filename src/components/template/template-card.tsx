import { TemplateDialogForm } from "./template-dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Template } from "@/schemas/template-schema";

interface CardTemplateProps {
  template: Template;
}

export function CardTemplate({ template }: CardTemplateProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>
          12 items • Criado por {template.creator.name}
        </CardDescription>
        <CardAction>
          <TemplateDialogForm id={template.id} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>{template.description}</CardDescription>
      </CardContent>
    </Card>
  );
}

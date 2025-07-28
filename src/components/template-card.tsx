import { TemplateDialogForm } from "./template-dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
          <TemplateDialogForm
            defaultValues={template}
            onSubmit={(value) => {
              console.log(value);
              return;
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias,
          exercitationem! Obcaecati impedit vel facere itaque sed, quis iure et
          dolorum, minima debitis sapiente dicta soluta odio aliquid! Labore,
          quasi ut?
        </CardDescription>
      </CardContent>
    </Card>
  );
}

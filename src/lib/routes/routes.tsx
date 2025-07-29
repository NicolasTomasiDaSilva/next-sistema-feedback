import {
  LayoutDashboard,
  LucideIcon,
  NotepadTextDashed,
  Star,
  Users,
} from "lucide-react";

export const pages = [
  {
    title: "Dashboard",
    description: "Descrição de uma página qualquer",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Modelos",
    description: "Adicione e edite modelos",
    url: "/templates",
    icon: NotepadTextDashed,
  },
  {
    title: "Avaliações",
    description: "Descrição de uma página qualquer",
    url: "/avaliacoes",
    icon: Star,
  },
  {
    title: "Funcionários",
    description: "Descrição de uma página qualquer",
    url: "/funcionarios",
    icon: Users,
  },
] as {
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
}[];

import { LayoutDashboard, LucideIcon, NotepadTextDashed, Star, Users } from "lucide-react";

export const pages = [
{
    title: "Dashboard",
    description: "Descrição de uma página qualquer.",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Templates",
    description: "Descrição de uma página qualquer.",
    url: "/templates",
    icon: NotepadTextDashed,
  },
  {
    title: "Avaliações",
    description: "Descrição de uma página qualquer.",
    url: "/avaliacoes",
    icon: Star,
  },
  {
    title: "Funcionários",
    description: "Descrição de uma página qualquer.",
    url: "/funcionarios",
    icon: Users,
  },
] as {
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
}[];
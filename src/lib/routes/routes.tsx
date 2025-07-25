import { LayoutDashboard, LucideIcon, NotepadTextDashed, Star, Users } from "lucide-react";

export const pages = [
{
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: NotepadTextDashed,
  },
  {
    title: "Avaliações",
    url: "/avaliacoes",
    icon: Star,
  },
  {
    title: "Funcionários",
    url: "/funcionarios",
    icon: Users,
  },
] as {
  title: string;
  url: string;
  icon: LucideIcon;
}[];
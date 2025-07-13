"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon, Users, Star, NotepadTextDashed } from "lucide-react";
import Link from "next/link";

const pages = [
  {
    name: "Templates",
    url: "/templates",
    icon: NotepadTextDashed,
  },
  {
    name: "Avaliações",
    url: "/avaliacoes",
    icon: Star,
  },
  {
    name: "Funcionários",
    url: "/funcionarios",
    icon: Users,
  },
] as {
  name: string;
  url: string;
  icon: LucideIcon;
}[];
export function NavPages() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Acessar</SidebarGroupLabel>
      <SidebarMenu>
        {pages.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url} prefetch>
                <item.icon className="size-4" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

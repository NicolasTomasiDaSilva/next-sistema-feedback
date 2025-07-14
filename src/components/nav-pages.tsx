"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon, Users, Star, NotepadTextDashed } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <>
      {/* Versão expandida - mostra texto e ícones */}
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Acessar</SidebarGroupLabel>
        <SidebarMenu>
          {pages.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={item.url} prefetch>
                    <item.icon className="size-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>

      {/* Versão colapsada - mostra apenas ícones */}
      <SidebarGroup className="group-data-[collapsible=icon]:block hidden">
        <TooltipProvider>
          <SidebarMenu>
            {pages.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={`icon-${item.name}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url} prefetch>
                          <item.icon className="size-4" />
                          <span className="sr-only">{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </TooltipProvider>
      </SidebarGroup>
    </>
  );
}

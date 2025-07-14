"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePageTitle } from "@/hooks/use-page-title";
import { ThemeToggle } from "./theme-toggle";

export function PageHeader() {
  const pageTitle = usePageTitle();

  return (
    <header className="bg-background sticky top-0 flex h-20 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <span className="text-xl font-bold">{pageTitle}</span>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}

"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePage } from "@/hooks/use-page";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const page = usePage();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />
        <div className="py-6 px-3 flex-1 flex flex-col max-w-5xl w-full mx-auto items-center">
          <h2 className="mr-auto text-muted-foreground">{page.description}</h2>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

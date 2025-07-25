"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />
        <div className="py-6 px-3 flex-1 flex flex-col max-w-5xl w-full mx-auto items-center">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </main>
  );
}

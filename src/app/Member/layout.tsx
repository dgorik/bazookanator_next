import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { AppSidebar } from "@/app/Member/components/sidebar/app-sidebar";

export default function MemeberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-row justify-between w-screen">
        {/* Sidebar on the left */}
        <div className="flex items-start">
          <AppSidebar />
          <SidebarTrigger />
        </div>
        <div> {children}</div>
      </div>
    </SidebarProvider>
  );
}

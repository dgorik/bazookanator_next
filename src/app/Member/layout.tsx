import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { AppSidebar } from "./components/sidebar/AppSidebar";
import MemberHeader from "./components/MemberHeader";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-row justify-between w-screen py-4">
        {/* Sidebar on the left */}
        <div className="flex items-start">
          <AppSidebar />
          <SidebarTrigger />
        </div>
        <MemberHeader />
        <div> {children}</div>
      </div>
    </SidebarProvider>
  );
}

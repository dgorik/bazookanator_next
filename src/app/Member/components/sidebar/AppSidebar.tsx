// components/ui/sidebar/AppSidebar.tsx
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { SideBarContent } from "./SideBarContent";
import { SideBarFooter } from "./SideBarFooter";

export function AppSidebar() {
  return (
    <Sidebar>
      <SideBarContent />
      <SideBarFooter />
    </Sidebar>
  );
}

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { AppSidebar } from "./components/sidebar/AppSidebar";
import { SessionWrapper } from "./components/SessionWrapper";
import MemberHeader from "./components/MemberHeader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  if (!session) {
    // Redirect unauthenticated users to login page
    redirect("/");
  }
  return (
    <SessionWrapper session={session}>
      <SidebarProvider>
        <div className="flex justify-between w-full py-4">
          {/* Sidebar on the left */}
          <div className="flex flex-row">
            <AppSidebar />
            <SidebarTrigger />
          </div>
          <MemberHeader />
          <div> {children}</div>
        </div>
      </SidebarProvider>
    </SessionWrapper>
  );
}

import {
  SidebarProvider,
  SidebarTrigger,
} from '@/src/components/ui/sidebar/sidebar'
import { AppSidebar } from './components/sidebar/AppSidebar'
import { requireUser, logoutIfSessionExpired } from '@/src/lib/auth/authHelpers'

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()
  await logoutIfSessionExpired(user)

  return (
    <SidebarProvider>
      <div className="flex w-full py-4">
        {/* Sidebar on the left */}
        <div className="flex flex-row">
          <AppSidebar user={user} />
          <SidebarTrigger />
        </div>
        <div> {children}</div>
      </div>
    </SidebarProvider>
  )
}

import {
  SidebarProvider,
  SidebarTrigger,
} from '@/src/components/ui/sidebar/sidebar'
import { AppSidebar } from './components/sidebar/AppSidebar'
import { requireUser, logoutIfSessionExpired } from '@/src/lib/auth/authHelpers'
import { useInactivitySignout } from '@/src/hooks/useInactivitySignout'
import SessionTimer from './components/session-timer/SessionTimer'

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  return (
    <SidebarProvider>
      <SessionTimer />
      <div className="flex w-full py-4">
        <div className="flex flex-row">
          <AppSidebar user={user} />
          <SidebarTrigger />
        </div>
        <div> {children}</div>
      </div>
    </SidebarProvider>
  )
}

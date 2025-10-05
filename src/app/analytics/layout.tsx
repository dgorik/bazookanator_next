import {
  SidebarProvider,
  SidebarTrigger,
} from '@/src/components/ui/sidebar/core/sidebar'
import { AppSidebar } from '../../components/ui/sidebar/AppSidebar'
import { requireUser } from '@/src/lib/auth/authHelpers'
import SessionTimer from '../../components/session/SessionTimer'

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  return (
    <div className="min-h-screen flex">
      <SessionTimer />
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarTrigger />
        <div className="flex-1 p-2"> {children}</div>
      </SidebarProvider>
    </div>
  )
}

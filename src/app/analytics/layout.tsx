import {
  SidebarProvider,
  SidebarTrigger,
} from '@/src/components/ui/sidebar/sidebar'
import { AppSidebar } from './components/sidebar/AppSidebar'
import { redirect } from 'next/navigation'
import { createClient } from '@/src/lib/client/supabase/server'
import { userAgent } from 'next/server'

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login?error=No+cheating!+You+need+to+sign+in')
  }
  const user = data.user
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

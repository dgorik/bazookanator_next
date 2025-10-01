// components/ui/sidebar/AppSidebar.tsx
import { Sidebar } from '@/src/components/ui/sidebar/core/sidebar'
import { SideBarContent } from '../../../app/analytics/components/sidebar/SideBarContent'
import { SideBarFooter } from '../../../app/analytics/components/sidebar/SideBarFooter'

export function AppSidebar({ user }: { user: any }) {
  return (
    <Sidebar>
      <SideBarContent />
      <SideBarFooter user={user} />
    </Sidebar>
  )
}

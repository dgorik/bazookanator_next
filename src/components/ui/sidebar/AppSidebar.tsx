// components/ui/sidebar/AppSidebar.tsx
import { Sidebar } from '@/src/components/ui/sidebar/core/sidebar'
import { SideBarContent } from './custom/SideBarContent'
import { SideBarFooter } from './custom/SideBarFooter'

export function AppSidebar({ user }: { user: any }) {
  return (
    <Sidebar>
      <SideBarContent />
      <SideBarFooter user={user} />
    </Sidebar>
  )
}

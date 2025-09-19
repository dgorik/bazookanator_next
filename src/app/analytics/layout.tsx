import {
  SidebarProvider,
  SidebarTrigger,
} from '../../components/ui/sidebar/sidebar'
import { AppSidebar } from './components/sidebar/AppSidebar'

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full py-4">
        {/* Sidebar on the left */}
        <div className="flex flex-row">
          <AppSidebar />
          <SidebarTrigger />
        </div>
        <div> {children}</div>
      </div>
    </SidebarProvider>
  )
}

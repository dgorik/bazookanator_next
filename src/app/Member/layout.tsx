import {
  SidebarProvider,
  SidebarTrigger,
} from '../../components/ui/sidebar/sidebar'
import { AppSidebar } from './components/sidebar/AppSidebar'
import MemberHeader from './components/MemberHeader'

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}

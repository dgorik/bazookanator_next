'use client'

import { signOut } from '@/src/app/api/auth/signout/actions'
import { useRouter } from 'next/navigation'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/src/components/ui/sidebar/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/other/dropdown-menu'

export function SideBarFooter({ user }: { user: any }) {
  const router = useRouter()
  const handleClick = async () => {
    const response = await signOut()
    if (response?.message) {
      router.push('/')
    }
  }
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>{user.email}</SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span onClick={handleClick}>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

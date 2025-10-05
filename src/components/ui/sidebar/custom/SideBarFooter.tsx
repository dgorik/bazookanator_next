'use client'

import { signOut } from '@/src/app/api/auth/signout/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/src/components/ui/sidebar/core/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/other - shadcn/dropdown-menu'

export function SideBarFooter({ user }: { user: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    setLoading(true)
    const response = await signOut()
    if (response?.message) {
      router.replace('/')
    } else {
      setLoading(false)
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
                <span onClick={handleClick}>
                  {loading ? 'Signing out...' : 'Sign out'}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

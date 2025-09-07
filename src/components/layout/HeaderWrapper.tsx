// components/HeaderWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import Header from './sections/header/Header'

export default function HeaderWrapper() {
  const pathname = usePathname()

  if (pathname.startsWith('/Member') || pathname.startsWith('/auth'))
    return null

  return <Header />
}

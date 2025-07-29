'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronsDown, Menu } from 'lucide-react'
import { Button } from '@/src/components/ui/buttons/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet/sheet'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: '#testimonials',
    label: 'Testimonials',
  },
  {
    href: '#team',
    label: 'Team',
  },
  {
    href: '#contact',
    label: 'Contact',
  },
  {
    href: '#faq',
    label: 'FAQ',
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="flex items-center text-2xl font-bold">
        <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        Bazookanator
      </Link>

      {/* <!-- Desktop --> */}
      <div className="hidden lg:block mx-auto">
        <nav>
          {routeList.map(({ href, label }) => (
            <Link key={href} href={href} className="text-base px-2">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2"></div>
      </div>

      {/* <!-- Mobile --> */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Select an option below.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-4">
              {routeList.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-base px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <Button className="w-1/4">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button className="w-1/4">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:flex gap-2">
        <Button>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
        <Button>
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  )
}

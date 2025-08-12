import Link from 'next/link'
import { ChevronsDownIcon } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="footer" className="mx-auto container py-24 sm:py-32 px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 p-10 gap-8 place-items-center bg-card border border-secondary rounded-2xl">
        <div className="flex items-center space-x-3">
          <Link href="#" className="flex items-center font-bold">
            <ChevronsDownIcon className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />
            <h3 className="text-lg">Bazookanator</h3>
          </Link>
        </div>

        <div className="text-sm text-muted-foreground">
          2025 Bazookanator. All rights reserved.
        </div>

        <div className="text-sm text-muted-foreground">
          Built only for Edible Entertainment
        </div>
      </div>
    </footer>
  )
}

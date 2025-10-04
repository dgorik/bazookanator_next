import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/src/components/ui/buttons/button'

export default function Filter() {
  return (
    <Button
      variant="secondary"
      className="w-full gap-2 py-1.5 text-base sm:w-fit sm:text-sm"
    >
      <SlidersHorizontal
        className="-ml-0.5 size-4 shrink-0 text-gray-400 dark:text-gray-600"
        aria-hidden="true"
      />
      Report Filters
    </Button>
  )
}

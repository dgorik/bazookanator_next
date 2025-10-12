'use client'

import { RiEqualizer2Line } from '@remixicon/react'
import { useState } from 'react'
import { cx, focusInput } from '@/src/lib/utils'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/src/components/ui/tremor/dropdown'

interface FilterProps {
  onChange: (selected: string[]) => void
}

export default function Filter({ onChange }: FilterProps) {
  const measures = ['2024 Actuals', 'Board OP3', 'OP6 LE', 'OP4 LE', 'OP3 LE']
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([])

  const toggleMeasure = (measure: string) => {
    let updated: string[]
    if (selectedMeasures.includes(measure)) {
      updated = selectedMeasures.filter((m) => m !== measure)
    } else {
      if (selectedMeasures.length < 2) {
        updated = [...selectedMeasures, measure]
      } else {
        // optional: prevent selecting more than 2
        updated = selectedMeasures
      }
    }
    setSelectedMeasures(updated)
    onChange(updated)
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cx(
              focusInput,
              'flex items-center gap-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50 focus:z-10 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 hover:dark:bg-gray-950/50',
            )}
          >
            <RiEqualizer2Line
              className="-ml-px size-5 shrink-0"
              aria-hidden={true}
            />
            View{' '}
            <span className="tabular-nums">({selectedMeasures.length})</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Measures</DropdownMenuLabel>
          {measures.map((measure) => (
            <DropdownMenuCheckboxItem
              key={measure}
              checked={selectedMeasures.includes(measure)}
              onCheckedChange={() => toggleMeasure(measure)}
            >
              {measure}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    /* <Button
      variant="secondary"
      className="w-full gap-2 py-1.5 text-base sm:w-fit sm:text-sm"
    >
      <SlidersHorizontal
        className="-ml-0.5 size-4 shrink-0 text-gray-400 dark:text-gray-600"
        aria-hidden="true"
      />
      Report Filters
    </Button> */
  )
}

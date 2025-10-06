'use client'

import { Button } from '@/src/components/ui/buttons/button'
import { divisions, brands } from '@/src/data/data'
// import { formatters } from '@/lib/utils'
import { Table } from '@tanstack/react-table'
import { DataTableFilter } from './DataTableFilter'
// import { ViewOptions } from './DataTableViewOptions'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
        {/* {table.getColumn('status')?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn('status')}
            title="Status"
            options={divisions}
            type="select"
          />
        )} */}
        {table.getColumn('brand')?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn('brand')}
            title="Brand"
            options={brands}
            type="checkbox"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="border border-gray-200 px-2 font-semibold text-indigo-600 sm:border-none sm:py-1 dark:border-gray-800 dark:text-indigo-500"
          >
            Clear filters
          </Button>
        )}
      </div>
      {/* We can revisit this later but for now let's omit it */}
      {/* <div className="flex items-center gap-2">
        <ViewOptions table={table} />
      </div> */}
    </div>
  )
}

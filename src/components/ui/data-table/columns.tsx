'use client'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { DataTableColumnHeader } from './DataTableColumnHeader'

//we are defining a row shape here
type Usage = {
  division: string
  brand: string
  category: string
  le: number
  boardop: number
  plan2025: number
  sales2024: number
  levsboardop?: number
  planvsboardop?: number
  salesvsplan?: number
}

const columnHelper = createColumnHelper<Usage>()

export const columns = [
  columnHelper.accessor('division', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Division" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'text-left',
      displayName: 'Division',
    },
  }),
  columnHelper.accessor('brand', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'text-left',
      displayName: 'Brand',
    },
  }),
  columnHelper.accessor('category', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'text-left',
      displayName: 'Category',
    },
  }),
  columnHelper.accessor('le', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LE" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'text-left',
      displayName: 'LE',
    },
  }),
  columnHelper.accessor('boardop', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Board OP" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'text-left',
      displayName: 'Board OP',
    },
  }),
  columnHelper.accessor('plan2025', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="2025 Plan" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'text-left',
      displayName: '2025 Plan',
    },
  }),
  columnHelper.accessor('sales2024', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="2024 Sales" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'text-left',
      displayName: '2024 Sales',
    },
  }),
] as ColumnDef<Usage>[]

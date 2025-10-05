import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { DataTableColumnHeader } from './DataTableColumnHeader'

type Usage = {
  brand: string
  le: number
  boardop: number
  plan2025: number
  sales2024: number
}

const columnHelper = createColumnHelper<Usage>()

export const columns = [
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
      <DataTableColumnHeader column={column} title="2025 Plan" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'text-left',
      displayName: '2024 Sales',
    },
  }),
] as ColumnDef<Usage>[]

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/src/components/ui/tremor/Table'

type Usage = {
  division: string
  brand: string
  category: string
  le: number
  boardop: number
  plan2025: number
  sales2024: number
}

interface SimpleTableProps {
  data: Usage[]
}

export function SimpleTable({ data }: SimpleTableProps) {
  return (
    <div className="relative overflow-hidden overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow className="border-y border-gray-200 dark:border-gray-800">
            <TableHeaderCell className="whitespace-nowrap py-1 text-sm sm:text-xs text-left">
              Division
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-nowrap py-1 text-sm sm:text-xs text-left">
              Brand
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-nowrap py-1 text-sm sm:text-xs text-left">
              Category
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-nowrap py-1 text-sm sm:text-xs text-left">
              LE
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-nowrap py-1 text-sm sm:text-xs text-left">
              Board OP
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-nowrap py-1 text-sm sm:text-xs text-left">
              2025 Plan
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-nowrap py-1 text-sm sm:text-xs text-left">
              2024 Sales
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 hover:dark:bg-gray-900"
            >
              <TableCell className="whitespace-nowrap py-1 text-gray-600 dark:text-gray-400">
                {row.division}
              </TableCell>
              <TableCell className="whitespace-nowrap py-1 text-gray-600 dark:text-gray-400">
                {row.brand}
              </TableCell>
              <TableCell className="whitespace-nowrap py-1 text-gray-600 dark:text-gray-400">
                {row.category}
              </TableCell>
              <TableCell className="whitespace-nowrap py-1 text-gray-600 dark:text-gray-400">
                {row.le.toLocaleString()}
              </TableCell>
              <TableCell className="whitespace-nowrap py-1 text-gray-600 dark:text-gray-400">
                {row.boardop.toLocaleString()}
              </TableCell>
              <TableCell className="whitespace-nowrap py-1 text-gray-600 dark:text-gray-400">
                {row.plan2025.toLocaleString()}
              </TableCell>
              <TableCell className="whitespace-nowrap py-1 text-gray-600 dark:text-gray-400">
                {row.sales2024.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

import { DataTable } from '@/src/components/ui/data-table/DataTable'
import { columns } from '@/src/components/ui/data-table/columns'

export const usage = [
  {
    division: 'B&M',
    brand: 'Acme Motors',
    category: 'Sedans',
    le: 75000000,
    boardop: 70000000,
    plan2025: 82000000,
    sales2024: 78000000,
  },
  {
    division: 'B&M',
    brand: 'Globex Corp',
    category: 'Trucks',
    le: 120000000,
    boardop: 125000000,
    plan2025: 115000000,
    sales2024: 105000000,
  },
  {
    division: 'Ecomm',
    brand: 'Soylent Foods',
    category: 'Snacks',
    le: 35000000,
    boardop: 36000000,
    plan2025: 42000000,
    sales2024: 38000000,
  },
  {
    division: 'Ecomm',
    brand: 'Initech Solutions',
    category: 'Software',
    le: 95000000,
    boardop: 98000000,
    plan2025: 105000000,
    sales2024: 92000000,
  },
  {
    division: 'B&M',
    brand: 'Genco Piles',
    category: 'Heavy Eq.',
    le: 22000000,
    boardop: 23500000,
    plan2025: 25000000,
    sales2024: 21000000,
  },
]

export default function Details() {
  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Details
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable data={usage} columns={columns} />
      </div>
    </>
  )
}

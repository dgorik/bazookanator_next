'use client'

import { BarChart } from '@tremor/react'
import { formatters } from '@/src/lib/utils'

interface BrandComparisonProps {
  data: { brand: string; measure_1_val: number; measure_2_val: number }[]
  measure1: string
  measure2: string
  title?: string
  description?: string
}

export default function BrandComparison({
  data,
  title,
  description,
}: BrandComparisonProps) {
  if (!data?.length) return <div>No data</div>

  const categories = ['measure_1_val', 'measure_2_val']

  return (
    <div className="flex flex-col justify-between p-0">
      <div>
        <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </dt>
        <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
          {description}
        </dd>
      </div>

      <BarChart
        className="mt-4 hidden h-80 md:block"
        data={data}
        index="brand"
        categories={categories}
        valueFormatter={(value) => formatters.unit(Number(value))}
        colors={['blue', 'orange']}
        xAxisLabel="Brand"
        yAxisLabel="Total Sales"
      />
    </div>
  )
}

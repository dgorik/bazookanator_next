'use client'

import { BarChart } from '@tremor/react'
import { formatters } from '@/src/lib/utils'

interface BrandComparisonProps {
  data: { brand: string; measure_1_val: number; measure_2_val: number }[]
  measure1: string
  measure2: string
}

export default function BrandComparison({
  data,
  measure1,
  measure2,
}: BrandComparisonProps) {
  if (!data?.length) return <div>No data</div>

  const categories = ['measure_1_val', 'measure_2_val']

  return (
    <BarChart
      className="mt-4 hidden h-80 md:block"
      data={data}
      index="brand"
      categories={categories}
      valueFormatter={(value) => formatters.unit(Number(value))}
      colors={['blue', 'orange']}
      showLegend
      xAxisLabel="Brand"
      yAxisLabel="Total Sales"
    />
  )
}

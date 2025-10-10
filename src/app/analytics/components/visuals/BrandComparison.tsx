'use client'

import { BarChart } from '@tremor/react'
import { formatters } from '@/src/lib/utils'

interface BrandComparisonProps {
  data: any[]
}

export default function BrandComparison({ data }: BrandComparisonProps) {
  if (!data?.length) return <div>no data</div>

  return (
    <BarChart
      className="mt-4 hidden h-80 md:block"
      data={data}
      index="brand"
      categories={['total_sales']}
      valueFormatter={(value) => formatters.unit(value)}
      colors={['blue']}
      showLegend={false}
      xAxisLabel="Brand"
      yAxisLabel="Total Sales"
    />
  )
}

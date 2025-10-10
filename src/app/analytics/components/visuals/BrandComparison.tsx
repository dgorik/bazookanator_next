'use client'

import useSWR from 'swr'

import { fetcher } from '@/src/lib/fetcher/brand_comparison/fetcher'
import { BarChart } from '@tremor/react'
import { formatters } from '@/src/lib/utils'

export default function BrandComparison() {
  const { data, error, isLoading } = useSWR('op-database', fetcher)
  const groupedObj = data || []

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  if (!data) return <div>no data</div>

  // render data
  return (
    <BarChart
      className="mt-4 hidden h-80 md:block"
      data={groupedObj}
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

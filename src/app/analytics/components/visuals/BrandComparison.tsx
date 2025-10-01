'use client'

import useSWR from 'swr'

import { fetcher } from '@/src/lib/fetcher/brand_comparison/fetcher'
import { BarChart } from '@tremor/react'
import { formatters } from '@/src/lib/utils'

export default function BrandComparison() {
  const { data, error, isLoading } = useSWR('op-database', fetcher)
  const groupedObj = data || []
  // ? groupBy(data as any[], 'brand') : {}
  // const grouped = Object.entries(groupedObj).map(([brand, items]) => ({
  //   brand,
  //   count: items.length,
  // }))
  // console.log(grouped)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  if (!data) return <div>no data</div>

  // render data
  return (
    <div className="flex flex-col gap-16">
      <BarChart
        className="h-80"
        data={groupedObj}
        index="brand"
        categories={['total_sales']}
        valueFormatter={(value) => formatters.unit(value)}
        colors={['blue']}
        showLegend={false}
        xAxisLabel="Brand"
        yAxisLabel="Total Sales"
      />
    </div>
  )
}

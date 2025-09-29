'use client'

import useSWR from 'swr'

import { fetcher } from '@/src/lib/fetcher/brand_comparison/fetcher'
import { BarChart } from '@tremor/react'

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
    <div>
      <BarChart
        className="h-72"
        data={groupedObj}
        index="brand"
        categories={['total_sales']}
        colors={['blue']}
        showLegend={false}
        // yAxisWidth={40}
      />
    </div>
  )
}

'use client'

import useSWR from 'swr'

import { fetcher } from '@/src/lib/fetcher/brand_comparison/fetcher'
import { groupBy } from '@/utils/visuals/general/arrayHelpers'
import { BarChart } from '@tremor/react'

export default function BrandComparison() {
  const { data, error, isLoading } = useSWR('op-database', fetcher)
  const grouped = data ? groupBy(data as any[], 'brand') : []
  console.log(grouped)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // render data
  return <div> {data?.[0]?.division}!</div>
}

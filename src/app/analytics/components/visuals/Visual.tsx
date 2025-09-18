'use client'

import useSWR from 'swr'

import { fetcher } from '@/src/lib/fetcher/fetcher'

export default function Visual() {
  const { data, error, isLoading } = useSWR('op-database', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // render data
  return <div> {data?.[0]?.division}!</div>
}

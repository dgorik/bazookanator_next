'use client'

import { useState } from 'react'
import Filter from './components/data-filter/Filter'
import BrandComparison from './components/visuals/BrandComparison'
import useSWR from 'swr'
import { getBrandComparisonData } from '@/src/lib/fetcher/brand_comparison/server'

export default function MemberClient() {
  const [filters, setFilters] = useState({
    measure1: '',
    measure2: '',
  })

  // SWR fetches data whenever filters change
  const { data, error } = useSWR([filters.measure1, filters.measure2], () =>
    getBrandComparisonData(filters),
  )

  const handleFilterChange = (selected: string[]) => {
    setFilters({
      measure1: selected[0] || '2024 Actuals',
      measure2: selected[1] || 'Board OP3',
    })
  }

  return (
    <section>
      <Filter onChange={handleFilterChange} />
      <dl className="grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
        {data ? (
          [1, 2, 3, 4].map((i) => (
            <BrandComparison
              key={i}
              data={data}
              measure1={filters.measure1}
              measure2={filters.measure2}
              title="Inherent risk"
              description="Risk scenarios over time grouped by risk level"
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </dl>
    </section>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Filter from './components/data-filter/Filter'
import BrandComparison from './components/visuals/BrandComparison'
import KPICard from './components/KPICard'
import KPISlicer from './components/KPISlicer'
import useSWR from 'swr'
import { getBrandComparisonData } from '@/src/lib/fetcher/brand_comparison/server'
import { formatters } from '@/src/lib/utils'

const MEASURES = ['2024 Actuals', 'Board OP3', 'OP6 LE', 'OP4 LE', 'OP3 LE']

const MONTHS = [
  'Jan Sales',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function MemberClient() {
  const [filters, setFilters] = useState({
    measure1: '',
    measure2: '',
  })

  const [kpiValueMeasure, setKpiValueMeasure] = useState<string>('2024 Actuals')
  const [kpiTargetMeasure, setKpiTargetMeasure] = useState<string>('Board OP3')
  const [selectedMonth, setSelectedMonth] = useState<string>(
    MONTHS[new Date().getMonth()],
  )

  // SWR fetches data whenever filters change
  const { data, error } = useSWR([filters.measure1, filters.measure2], () =>
    getBrandComparisonData(filters),
  )

  // Fetch data for KPI value measure
  const { data: kpiValueData } = useSWR(
    kpiValueMeasure ? ['kpi-value', kpiValueMeasure] : null,
    () =>
      getBrandComparisonData({
        measure1: kpiValueMeasure,
        measure2: kpiValueMeasure,
      }),
  )

  // Fetch data for KPI target measure
  const { data: kpiTargetData } = useSWR(
    kpiTargetMeasure ? ['kpi-target', kpiTargetMeasure] : null,
    () =>
      getBrandComparisonData({
        measure1: kpiTargetMeasure,
        measure2: kpiTargetMeasure,
      }),
  )

  const handleFilterChange = (selected: string[]) => {
    setFilters({
      measure1: selected[0] || '2024 Actuals',
      measure2: selected[1] || 'Board OP3',
    })
  }

  // Calculate KPI values from data
  const kpiData = useMemo(() => {
    const value = kpiValueData
      ? kpiValueData.reduce(
          (sum: number, item: any) => sum + (item.measure_1_val || 0),
          0,
        )
      : 0

    const target = kpiTargetData
      ? kpiTargetData.reduce(
          (sum: number, item: any) => sum + (item.measure_2_val || 0),
          0,
        )
      : 0

    // Calculate growth percentage
    const growth = target !== 0 ? ((value - target) / target) * 100 : 0

    return {
      value,
      target,
      growth,
    }
  }, [kpiValueData, kpiTargetData])

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Sales and growth stats for anonymous inc.
        </p>
      </div>

      <Filter onChange={handleFilterChange} />

      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <KPISlicer
          label="Month"
          selectedMeasure={selectedMonth}
          onMeasureChange={setSelectedMonth}
          measures={MONTHS}
        />
        <KPISlicer
          label="Value Measure"
          selectedMeasure={kpiValueMeasure}
          onMeasureChange={setKpiValueMeasure}
          measures={MEASURES}
        />
        <KPISlicer
          label="Target Measure"
          selectedMeasure={kpiTargetMeasure}
          onMeasureChange={setKpiTargetMeasure}
          measures={MEASURES}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KPICard
          title="Month"
          value={kpiData.value}
          growth={kpiData.growth}
          target={kpiData.target}
        />
        <KPICard
          title="YTD Sales"
          value={kpiData.value}
          growth={kpiData.growth}
          target={kpiData.target}
        />
        <KPICard
          title="Total"
          value={kpiData.value}
          growth={kpiData.growth}
          target={kpiData.target}
        />
      </div>

      <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
        {data ? (
          <BrandComparison
            data={data}
            measure1={filters.measure1}
            measure2={filters.measure2}
            title="Sales: Entries"
            description="Sales data across different regions and stores"
          />
        ) : (
          <div className="flex h-80 items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Filter from './components/data-filter/Filter'
import BrandComparison from './components/visuals/BrandComparison'
import KPICard from './components/KPICard'
import KPISlicer from './components/KPISlicer'
import useSWR from 'swr'
import { getBrandComparisonData } from '@/src/lib/fetcher/fetchers'
import { getMeasures } from '@/src/lib/fetcher/fetchers'
import { getKpiTargetValue } from '@/src/lib/fetcher/fetchers'
import { getKpiValue } from '@/src/lib/fetcher/fetchers'
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

  const { data: measuresData, isLoading: isLoadingMeasures } = useSWR(
    'measures',
    getMeasures,
  )

  // Process measures data - filter out null values and convert to strings
  const availableMeasures: string[] = useMemo(() => {
    if (!measuresData || measuresData.length === 0) return MEASURES
    return measuresData
      .filter((m: string | null) => m != null && m.trim() !== '')
      .map((m: string) => String(m).trim())
  }, [measuresData])

  const [kpiValueMeasure, setKpiValueMeasure] = useState<string>('2024 Actuals')
  const [kpiTargetMeasure, setKpiTargetMeasure] = useState<string>('Board OP9')

  // Compute valid measure values - use current state if valid, otherwise use first available
  const validValueMeasure = useMemo(() => {
    if (isLoadingMeasures || availableMeasures.length === 0)
      return kpiValueMeasure
    return availableMeasures.includes(kpiValueMeasure)
      ? kpiValueMeasure
      : availableMeasures[0] || '2024 Actuals'
  }, [isLoadingMeasures, availableMeasures, kpiValueMeasure])

  const validTargetMeasure = useMemo(() => {
    if (isLoadingMeasures || availableMeasures.length === 0)
      return kpiTargetMeasure
    return availableMeasures.includes(kpiTargetMeasure)
      ? kpiTargetMeasure
      : availableMeasures[1] || availableMeasures[0] || 'Board OP3'
  }, [isLoadingMeasures, availableMeasures, kpiTargetMeasure])
  const [selectedMonth, setSelectedMonth] = useState<string>(
    MONTHS[new Date().getMonth()],
  )

  // SWR fetches data whenever filters change
  const { data, error } = useSWR([filters.measure1, filters.measure2], () =>
    getBrandComparisonData(filters),
  )

  // Fetch data for KPI value measure when validValueMeasure is not empty
  const { data: kpiValueData } = useSWR(
    validValueMeasure ? ['kpi-value', validValueMeasure] : null,
    () =>
      getKpiValue({
        measure: validValueMeasure,
      }),
  )

  // Fetch data for KPI value measure when validTargetMeasure is not empty
  const { data: kpiTargetData } = useSWR(
    validTargetMeasure ? ['kpi-target', validTargetMeasure] : null,
    () =>
      getKpiTargetValue({
        measure: validTargetMeasure,
      }),
  )

  const handleFilterChange = (selected: string[]) => {
    setFilters({
      measure1: selected[0] || availableMeasures[0] || '',
      measure2: selected[1] || availableMeasures[1] || '',
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

      <Filter onChange={handleFilterChange} measures={availableMeasures} />

      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <KPISlicer
          label="Month"
          selectedMeasure={selectedMonth}
          onMeasureChange={setSelectedMonth}
          measures={MONTHS}
        />
        <KPISlicer
          label="Value Measure"
          selectedMeasure={validValueMeasure}
          onMeasureChange={setKpiValueMeasure}
          measures={availableMeasures}
        />
        <KPISlicer
          label="Target Measure"
          selectedMeasure={validTargetMeasure}
          onMeasureChange={setKpiTargetMeasure}
          measures={availableMeasures}
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

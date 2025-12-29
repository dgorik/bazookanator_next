'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'
import KPICard from './components/visuals/KPICard'
import AnalyticsFilterBar from './components/AnalyticsFilterBar'
import {
  getMeasuresFromProductData,
  getMeasureTotal,
} from '@/src/lib/fetcher/fetchers'
import { DEFAULT_MEASURES, ANALYTICS_MONTHS } from '@/src/data/filter_data'

export default function MemberClient() {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    ANALYTICS_MONTHS[new Date().getMonth()] || ANALYTICS_MONTHS[0],
  )
  const [valueMeasure, setValueMeasure] = useState<string>(DEFAULT_MEASURES[0])
  const [targetMeasure, setTargetMeasure] = useState<string>(
    DEFAULT_MEASURES[1] || DEFAULT_MEASURES[0],
  )

  // Fetch available measures from DB
  const { data: dbMeasures } = useSWR('measures', getMeasuresFromProductData)

  const availableMeasures = useMemo(() => {
    if (!dbMeasures || dbMeasures.length === 0) return ['OP9']
    return dbMeasures.map((m: any) => m.measure || m).filter(Boolean)
  }, [dbMeasures])

  // Fetch KPI data
  const { data: valueData, isLoading: isLoadingValue } = useSWR(
    valueMeasure ? ['kpi-value', valueMeasure] : null,
    () => getMeasureTotal(valueMeasure),
  )

  const { data: targetData, isLoading: isLoadingTarget } = useSWR(
    targetMeasure ? ['kpi-target', targetMeasure] : null,
    () => getMeasureTotal(targetMeasure),
  )

  // Calculate aggregated KPI values
  const kpiMetrics = useMemo(() => {
    const sumValue = (data: any[]) =>
      data?.reduce((acc, curr) => acc + (Number(curr.sales) || 0), 0) || 0

    const val = sumValue(valueData || [])
    const tgt = sumValue(targetData || [])
    const growth = tgt !== 0 ? ((val - tgt) / tgt) * 100 : 0

    return {
      value: val,
      target: tgt,
      growth: growth,
    }
  }, [valueData, targetData])

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

      <AnalyticsFilterBar
        configs={[
          {
            label: 'Month',
            value: selectedMonth,
            options: ANALYTICS_MONTHS,
            onChange: setSelectedMonth,
          },
          {
            label: 'Value',
            value: valueMeasure,
            options: availableMeasures,
            onChange: setValueMeasure,
          },
          {
            label: 'Target',
            value: targetMeasure,
            options: availableMeasures,
            onChange: setTargetMeasure,
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KPICard
          title="Value vs Target"
          value={kpiMetrics.value}
          target={kpiMetrics.target}
          growth={kpiMetrics.growth}
        />
        <KPICard
          title="YTD Performance"
          value={kpiMetrics.value} // Placeholder logic
          target={kpiMetrics.target}
          growth={kpiMetrics.growth}
        />
        <KPICard
          title="Total Outlook"
          value={kpiMetrics.value} // Placeholder logic
          target={kpiMetrics.target}
          growth={kpiMetrics.growth}
        />
      </div>
    </section>
  )
}

'use client'

import KPISlicer from './visuals/KPISlicer'
import { type TimeView } from '@/src/lib/fetcher/fetchers'

interface FilterConfig {
  label: string
  value: string
  options: string[]
  onChange: (val: string) => void
  isLoading?: boolean
  showOnTabs?: TimeView[]
}

interface AnalyticsFilterBarProps {
  configs: FilterConfig[]
  currentTab: TimeView
}

export default function AnalyticsFilterBar({
  configs,
  currentTab,
}: AnalyticsFilterBarProps) {
  const visibleConfigs = configs.filter(
    (config) => !config.showOnTabs || config.showOnTabs.includes(currentTab),
  )

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
      {visibleConfigs.map((config, index) => (
        <div key={config.label} className="flex items-center gap-4">
          <KPISlicer
            label={config.label}
            selectedMeasure={config.value}
            onMeasureChange={config.onChange}
            measures={config.isLoading ? ['Loading...'] : config.options}
          />
          {index < visibleConfigs.length - 1 && (
            <div className="hidden h-6 w-px bg-gray-200 dark:bg-gray-800 sm:block" />
          )}
        </div>
      ))}
    </div>
  )
}

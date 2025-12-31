'use client'

import KPISlicer from './visuals/KPISlicer'

interface FilterConfig {
  label: string
  value: string
  options: string[]
  onChange: (val: string) => void
  isLoading?: boolean
}

interface AnalyticsFilterBarProps {
  configs: FilterConfig[]
}

export default function AnalyticsFilterBar({
  configs,
}: AnalyticsFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
      {configs.map((config, index) => (
        <div key={config.label} className="flex items-center gap-4">
          <KPISlicer
            label={config.label}
            selectedMeasure={config.value}
            onMeasureChange={config.onChange}
            measures={config.isLoading ? ['Loading...'] : config.options}
          />
          {index < configs.length - 1 && (
            <div className="hidden h-6 w-px bg-gray-200 dark:bg-gray-800 sm:block" />
          )}
        </div>
      ))}
    </div>
  )
}

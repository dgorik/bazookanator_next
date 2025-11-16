'use client'

import { cn } from '@/src/lib/utils'
import { Card, CardContent } from '@/src/components/ui/other - shadcn/card'
import { formatters } from '@/src/lib/utils'

interface KPICardProps {
  title: string
  value: number
  growth: number
  target: number
  valueFormatter?: (value: number) => string
  className?: string
}

export default function KPICard({
  title,
  value,
  growth,
  target,
  valueFormatter,
  className,
}: KPICardProps) {
  const isPositive = growth >= 0
  const percentage = (value / target) * 100
  const formattedValue = valueFormatter
    ? valueFormatter(value)
    : formatters.currency({ number: value, maxFractionDigits: 0 })

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </h3>
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                isPositive
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
              )}
            >
              {isPositive ? (
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              ) : (
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              <span>{Math.abs(growth).toFixed(1)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {formattedValue}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>
                {percentage.toFixed(1)}% ({formattedValue})
              </span>
              <span>
                {valueFormatter
                  ? valueFormatter(target)
                  : formatters.currency({ number: target, maxFractionDigits: 0 })}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-blue-500 transition-all duration-300 dark:bg-blue-600"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


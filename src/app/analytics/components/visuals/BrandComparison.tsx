'use client'

import { useMemo } from 'react'
import { BarChart } from '@tremor/react'
import { formatters, cn } from '@/src/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/other - shadcn/card'

interface BrandComparisonProps {
  data: { brand: string; measure_1_val: number; measure_2_val: number }[]
  measure1: string
  measure2: string
  title?: string
  description?: string
  className?: string
}

export default function BrandComparison({
  data,
  measure1,
  measure2,
  title = 'Brand Comparison',
  description = 'Compare brand performance across measures',
  className,
}: BrandComparisonProps) {
  const transformedData = useMemo(() => {
    return data.map((item) => ({
      brand: item.brand,
      [measure1]: item.measure_1_val,
      [measure2]: item.measure_2_val,
    }))
  }, [data, measure1, measure2])

  const categories = useMemo(() => [measure1, measure2], [measure1, measure2])

  const valueFormatter = useMemo(
    () => (value: number) => formatters.million({ number: value, decimals: 1 }),
    [],
  )

  if (!data?.length) {
    return (
      <Card className={cn('w-full', className)}>
        <CardContent className="flex h-80 items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No data available
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <BarChart
          className="h-80"
          data={transformedData}
          index="brand"
          categories={categories}
          valueFormatter={valueFormatter}
          colors={['blue', 'orange']}
          showLegend
          showGridLines
          xAxisLabel="Brand"
          yAxisLabel="Value"
        />
      </CardContent>
    </Card>
  )
}

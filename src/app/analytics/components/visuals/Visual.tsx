'use client'

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { BarChart } from '@tremor/react'

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

// Types
type Region = 'Europe' | 'Asia' | 'North America'

interface Tab {
  name: Region
  value: string
}

interface DataItem {
  date: string
  Europe: number
  Asia: number
  'North America': number
}

const tabs: Tab[] = [
  { name: 'Europe', value: '$0.7M' },
  { name: 'Asia', value: '$0.6M' },
  { name: 'North America', value: '$0.7M' },
]

const data: DataItem[] = [
  { date: 'Jan 22', Europe: 48560, Asia: 38560, 'North America': 34940 },
  { date: 'Feb 22', Europe: 60320, Asia: 30320, 'North America': 34940 },
  { date: 'Mar 22', Europe: 75233, Asia: 65233, 'North America': 84560 },
  { date: 'Apr 22', Europe: 51123, Asia: 39123, 'North America': 74320 },
  { date: 'May 22', Europe: 51000, Asia: 72600, 'North America': 63120 },
  { date: 'Jun 22', Europe: 90450, Asia: 81390, 'North America': 51340 },
  { date: 'Jul 22', Europe: 79390, Asia: 41340, 'North America': 61260 },
  { date: 'Aug 22', Europe: 74100, Asia: 63120, 'North America': 51210 },
  { date: 'Sep 22', Europe: 71090, Asia: 59450, 'North America': 51110 },
  { date: 'Oct 22', Europe: 71080, Asia: 63345, 'North America': 41430 },
  { date: 'Nov 22', Europe: 63041, Asia: 50210, 'North America': 90330 },
  { date: 'Dec 22', Europe: 51143, Asia: 41321, 'North America': 69780 },
  { date: 'Jan 23', Europe: 68560, Asia: 28560, 'North America': 34940 },
  { date: 'Feb 23', Europe: 70320, Asia: 30320, 'North America': 44940 },
  { date: 'Mar 23', Europe: 80233, Asia: 70233, 'North America': 94560 },
  { date: 'Apr 23', Europe: 55123, Asia: 45123, 'North America': 84320 },
  { date: 'May 23', Europe: 56000, Asia: 80600, 'North America': 71120 },
  { date: 'Jun 23', Europe: 100000, Asia: 85390, 'North America': 61340 },
  { date: 'Jul 23', Europe: 85390, Asia: 45340, 'North America': 71260 },
  { date: 'Aug 23', Europe: 80100, Asia: 70120, 'North America': 61210 },
  { date: 'Sep 23', Europe: 75090, Asia: 69450, 'North America': 61110 },
  { date: 'Oct 23', Europe: 71080, Asia: 63345, 'North America': 41430 },
  { date: 'Nov 23', Europe: 68041, Asia: 61210, 'North America': 100330 },
  { date: 'Dec 23', Europe: 60143, Asia: 45321, 'North America': 80780 },
]

function valueFormatter(number: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
  }).format(number)
}

export default function Visual() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('Europe')

  const formattedData = data.map((item) => ({
    date: item.date,
    Sales: item[selectedRegion],
  }))

  return (
    <div className="sm:mx-auto sm:max-w-3xl">
      <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Sales breakdown by regions
      </h3>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Check sales of top 3 regions
      </p>

      <RadioGroup
        name="Region"
        value={selectedRegion}
        onChange={setSelectedRegion}
        className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3"
      >
        {tabs.map((tab) => (
          <RadioGroup.Option
            key={tab.name}
            value={tab.name}
            className={({ active }) =>
              classNames(
                active
                  ? 'border-tremor-brand-subtle ring-2 ring-tremor-brand-muted dark:border-dark-tremor-brand-subtle dark:ring-dark-tremor-brand-muted'
                  : 'border-tremor-border dark:border-dark-tremor-border',
                'relative block cursor-pointer rounded-tremor-default border bg-tremor-background px-4 py-3 transition dark:bg-dark-tremor-background',
              )
            }
          >
            {({ active, checked }) => (
              <>
                <h3 className="text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                  {tab.name}
                </h3>
                <p className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {tab.value}
                </p>
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked
                      ? 'border-tremor-brand dark:border-dark-tremor-brand'
                      : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-tremor-default',
                  )}
                  aria-hidden={true}
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      <BarChart
        data={formattedData}
        index="date"
        categories={['Sales']}
        showLegend={false}
        showAnimation={true}
        animationDuration={300}
        valueFormatter={valueFormatter}
        yAxisWidth={50}
        className="mt-10 hidden h-72 sm:block"
      />
      <BarChart
        data={formattedData}
        index="date"
        categories={['Sales']}
        showLegend={false}
        showAnimation={true}
        animationDuration={300}
        valueFormatter={valueFormatter}
        showYAxis={false}
        startEndOnly={true}
        className="mt-6 h-56 sm:hidden"
      />
    </div>
  )
}

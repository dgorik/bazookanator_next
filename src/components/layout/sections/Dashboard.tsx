'use client'

import {
  Card,
  CardContent,
  CardTitle,
} from '@/src/components/ui/other - shadcn/card'
import { ProgressCircle } from '@/src/components/ui/progress_circle/progress-circle'
import CountUp from 'react-countup'

interface AnalyticsProps {
  name: string
  percentage: number
  comparison: string
}

interface CounterProps {
  title: string
  description: string
  counter: number
  duration: number
  prefix: string
  suffix: string
  style: React.CSSProperties | undefined
}

export default function Dashboard() {
  const analyticsData: AnalyticsProps[] = [
    { name: 'Mass & Club', percentage: 75, comparison: 'vs. Z' },
    { name: 'Grocery & Channels', percentage: 49, comparison: 'vs. X' },
    { name: 'Convenience', percentage: 90, comparison: 'vs. Y' },
  ]

  const counterData: CounterProps[] = [
    {
      title: 'Ring Pops',
      description: 'Produced every year',
      counter: 400,
      duration: 4,
      prefix: '',
      suffix: ' M',
      style: { color: 'red', fontWeight: 'bold', fontSize: '2rem' },
    },
    {
      title: 'Pieces of Bazooka Bubblegum',
      description: 'Sold annually',
      counter: 500,
      duration: 4,
      prefix: '',
      suffix: ' M',
      style: { color: 'blue', fontWeight: 'bold', fontSize: '2rem' },
    },
    {
      title: 'Daily Sales Trackers',
      description: 'Sent out internally',
      counter: 75000,
      duration: 4,
      prefix: '',
      suffix: '',
      style: { color: 'green', fontWeight: 'bold', fontSize: '2rem' },
    },
  ]

  return (
    <section id="dashboard" className="w-full py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {/* Animated Counter Cards */}
        {counterData.map((box, index) => (
          <Card
            key={`counter-${index}`}
            className="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-muted/50 dark:bg-card hover:shadow-lg hover:bg-background transition-all duration-300"
          >
            <CountUp
              className="text center text-4xl sm:text-5xl md:text-6xl font-bold"
              end={box.counter}
              duration={box.duration}
              prefix={box.prefix}
              suffix={box.suffix}
              style={box.style}
            />

            <CardContent className="text-center">
              <CardTitle>{box.title}</CardTitle>
              <span className="text-sm text-tremor-label dark:text-dark-tremor-label">
                {box.description}
              </span>
            </CardContent>
          </Card>
        ))}
        {analyticsData.map((item, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-center rounded-xl shadow-md bg-muted/50 dark:bg-card hover:shadow-lg hover:bg-background transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-lg font-semibold">{item.name}</span>
              <span className="text-sm italic text-tremor-label dark:text-dark-tremor-label mt-1">
                {item.comparison}
              </span>
            </div>
            <ProgressCircle
              value={item.percentage}
              radius={30}
              strokeWidth={6}
              showAnimation
              variant={
                item.percentage < 50
                  ? 'error'
                  : item.percentage < 80
                    ? 'warning'
                    : 'success'
              }
            >
              <span className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.percentage}&#37;
              </span>
            </ProgressCircle>
          </Card>
        ))}
      </div>
    </section>
  )
}

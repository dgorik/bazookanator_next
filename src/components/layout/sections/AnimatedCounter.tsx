'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/other/card'
import CountUp from 'react-countup'

export default function AnimatedCounter() {
  interface CounterProps {
    title: string
    description: string
    counter: number
    duration: number
    prefix: string
    suffix: string
    style: React.CSSProperties | undefined
  }

  const boxes: CounterProps[] = [
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
      title: 'Pieces of Bazooka Bubblegum ',
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
    <section id="animatedcounter" className="w-full">
      <div className="grid lg:grid-cols-3 gap-6 p-4 py-24 sm:py-32">
        {boxes.map((box, index) => (
          <Card
            key={index}
            className="w-1/2 mx-auto bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
          >
            <CardHeader>
              <CountUp
                className='"text-9xl font-bold"'
                end={box.counter}
                duration={box.duration}
                prefix={box.prefix}
                suffix={box.suffix}
                style={box.style}
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{box.title}</CardTitle>
              <span>{box.description}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

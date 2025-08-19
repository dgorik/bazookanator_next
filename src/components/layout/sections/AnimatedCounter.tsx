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
    desripttion: string
    counter: number
    prefix: string
    postfix: string
  }

  const boxes: CounterProps[] = [
    {
      title: 'Users',
      desripttion: '',
      counter: 1000,
      prefix: '',
      postfix: '+',
    },
    {
      title: 'Projects',
      desripttion: '',
      counter: 500,
      prefix: '',
      postfix: '+',
    },
    {
      title: 'Satisfaction',
      desripttion: '',
      counter: 100,
      prefix: '',
      postfix: '%',
    },
  ]

  return (
    <div className="grid lg:grid-cols-3">
      {boxes.map((box, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-4xl font-bold">{box.title}</span>
        </div>
      ))}
    </div>
  )
}

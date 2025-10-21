'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/other - shadcn/card'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || 'An unexpected error occurred'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">
            Authentication Error
          </CardTitle>
          <CardDescription>Something went wrong</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center">{error}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  )
}

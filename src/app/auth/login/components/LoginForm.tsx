'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/src/components/ui/buttons/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/other/card'
import { Input } from '@/src/components/ui/other/input'
import { Label } from '@/src/components/ui/other/label'
import { login } from '@/src/app/api/auth/login/actions'

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<{
    type: string
    message: string
  } | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  const success = searchParams.get('success')
  const error = searchParams.get('error')
  useEffect(() => {
    if (success) {
      setStatus({ type: 'success', message: success })
    }
    if (error) {
      setStatus({ type: 'error', message: error })
    }
  }, [success, error])

  const handlePostUsers = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    try {
      const response = await login({
        email,
        password,
      })

      if (response?.message) {
        router.push('/analytics')
      }

      if (response?.error) {
        setStatus({ type: 'error', message: response.error })
        return
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePostUsers} className="flex flex-col gap-6 mb-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="@bazooka-inc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
          <Link href="/auth/signup">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
          <Link href="/auth/forgot-password">
            <Button className="w-1/2 mx-auto block">Forgot Password</Button>
          </Link>
        </form>
        {status?.type && (
          <div
            className={`flex justify-center mt-2 ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
          >
            {status.message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

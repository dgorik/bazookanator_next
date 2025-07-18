'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
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

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('errors')
    const success = searchParams.get('success')

    if (error) setErrorMsg(error)
    if (success) setSuccessMsg(success)
  }, [searchParams])

  const handlePostUsers = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setErrorMsg(res.error)
    } else {
      router.push('/Member?success=logged_in')
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

        <div className="mt-2 text-center">
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          {successMsg && <p className="text-green-600">{successMsg}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

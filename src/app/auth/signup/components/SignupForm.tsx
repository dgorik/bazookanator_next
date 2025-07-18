'use client'
import { useState } from 'react'
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

import { signup } from '@/src/app/api/auth/signup/actions'

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus({ type: 'error', message: 'Email is required.' })
      return
    }
    // } else if (!email.endsWith('@bazooka-inc.com')) {
    //   setStatus({
    //     type: 'error',
    //     message: 'Please enter a @bazooka-inc email.',
    //   })
    //   return
    // }

    if (password.length < 6) {
      setStatus({
        type: 'error',
        message: 'Password must be at least 6 characters.',
      })
      return
    }

    try {
      const response = await signup({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })

      if (response?.error) {
        setStatus({ type: 'error', message: response.error })
        return
      }
      setStatus({
        type: 'success',
        message: 'Please check your email to confirm your account.',
      })
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your information to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="first_name"
                  value={firstName}
                  required={true}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Bazooka"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  type="last_name"
                  value={lastName}
                  required={true}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Joe"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@bazooka-inc.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>

        {status.type === 'success' && (
          <div className="flex justify-center mt-2 text-green-600">
            {status.message}
          </div>
        )}
        {status.type === 'error' && (
          <div className="flex justify-center mt-2 text-red-600">
            {status.message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

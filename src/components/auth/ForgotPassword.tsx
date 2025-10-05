'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/other/card'
import { useState } from 'react'
import { Button } from '@/src/components/ui/buttons/button'
import { Input } from '@/src/components/ui/other/input'
import { Label } from '@/src/components/ui/other/label'
import { resetPassword } from '@/src/app/api/auth/reset-password/actions'

export default function ForgotPasswordForm({}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<{
    type: string
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setStatus(null)

    if (!email) {
      setStatus({ type: 'error', message: 'Email is required.' })
      return
    }

    try {
      const response = await resetPassword({ email })
      if (response?.error) {
        setStatus({ type: 'error', message: response.error })
        return
      }
      setStatus({
        type: 'success',
        message: 'If the email exists, a reset link has been sent.',
      })
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message })
    }
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email below to reset the password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mb-3 ">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required={true}
                placeholder="@bazooka-inc.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Reset
            </Button>
          </div>
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

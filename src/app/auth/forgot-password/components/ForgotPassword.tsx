'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/other/card'
import { useState } from 'react'
import { Button } from '../../../../components/ui/buttons/button'
import { Input } from '../../../../components/ui/other/input'
import { Label } from '../../../../components/ui/other/label'

export default function ForgotPasswordForm({}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) {
        setStatus({ type: 'error', message: data.message }) //this line catches 400, 404, 500 return statuses
      } else {
        setStatus({ type: 'success', message: data.message })
      }
    } catch (error) {
      setStatus({ type: 'success', message: 'An unknown error occurred' })
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
        <form>
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
            <Button
              type="submit"
              className="w-full"
              onClick={handleResetPassword}
            >
              Reset
            </Button>
          </div>
        </form>
        <div>
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
        </div>
      </CardContent>
    </Card>
  )
}

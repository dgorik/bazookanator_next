'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ButtonLoading } from '../../../components/ui/buttons/button_loading'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/other/card'
import { Button } from '../../../components/ui/buttons/button'
import { Input } from '../../../components/ui/other/input'
import { Label } from '../../../components/ui/other/label'

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<null | {
    type: boolean
    message: string
  }>(null) //what does this do
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (token) {
      fetch(`/api/auth/reset-password?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setLoading(false)
          } else {
            setMessage(data.error || 'Verification failed')
          }
        })
        .catch(() =>
          setMessage({
            type: false,
            message: 'Verification failed, please try again',
          }),
        )
        .finally(() => setLoading(false))
    }
  }, [token])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password) {
      setMessage({
        type: false,
        message: 'Password cannot be blank',
      })
    }

    if (password.length < 6) {
      setMessage({
        type: false,
        message: 'Password must be at least 6 characters.',
      })
    }

    if (password != confirmPassword) {
      setMessage({
        type: false,
        message: 'Password must match',
      })
    }
  }

  if (loading)
    return (
      <div className="flex flex-col items-center">
        <ButtonLoading />
      </div>
    )

  return (
    <div className="min-h-screen flex items-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6 mb-3 ">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Label htmlFor="password">Confirmm Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={confirmPassword}
                  required={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
          {message && (
            <div
              className={` flex justify-center ${
                message.type === true ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

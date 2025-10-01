import LoginForm from '../../../components/auth/LoginForm'
import { Suspense } from 'react'

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

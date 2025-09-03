import LoginForm from './components/LoginForm'
import { Suspense } from 'react'

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </Suspense>
  )
}

import UpdatePassword from '@/src/components/auth/UpdatePassword'
import { Suspense } from 'react'

export default function UpdatePasswordPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Suspense fallback={<div> Loading...</div>}>
          <UpdatePassword />
        </Suspense>
      </div>
    </>
  )
}

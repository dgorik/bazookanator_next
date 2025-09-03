import UpdatePassword from '@/src/app/auth/update-password/components/UpdatePassword'
import { Suspense } from 'react'

export default function UpdatePasswordPage() {
  return (
    <>
      <Suspense fallback={<div> Loading...</div>}>
        <UpdatePassword />
      </Suspense>
    </>
  )
}

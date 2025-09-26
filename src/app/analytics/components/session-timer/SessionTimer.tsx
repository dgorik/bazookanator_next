'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/lib/client/supabase/client'

export default function SessionTimer() {
  const router = useRouter()
  const maxSessionDuration = 1000 * 60
  const supabase = createClient()
  useEffect(() => {
    const timeout = setTimeout(async () => {
      await supabase.auth.signOut()
      router.push(
        '/auth/login?error=Your+session+has+expired,+please+log+in+again',
      )
    }, maxSessionDuration)
    return () => clearTimeout(timeout)
  }, [])
  return null
}

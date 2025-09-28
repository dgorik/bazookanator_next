'use client'

import { useInactivitySignout } from '@/src/hooks/useInactivitySignout'

export default function SessionTimer() {
  useInactivitySignout()
  return null
}

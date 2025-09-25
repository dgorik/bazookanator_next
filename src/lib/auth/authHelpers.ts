import { createClient } from '@/src/lib/client/supabase/server'
import { redirect } from 'next/navigation'


export async function requireUser(){
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login?error=No+cheating!+You+need+to+sign+in')
  }
  const user = data.user
  return user
}

export async function logoutIfSessionExpired(user: any) { 
  const sessionStart = new Date(user.last_sign_in_at) 
  const maxSessionDuration = 1000 * 30 

  if (Date.now() - sessionStart.getTime() > maxSessionDuration) {
    redirect('/auth/login?error=Your+session+has+expired,+please+log+in+again')
  }
}

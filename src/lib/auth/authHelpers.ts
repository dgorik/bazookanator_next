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

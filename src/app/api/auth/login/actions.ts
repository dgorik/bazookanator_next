'use server'
import { createClient } from '@/src/lib/client/supabase/server'
import {loginSchema, type LoginCredentials} from '@/src/lib/validations/auth'

export async function login(credentials: LoginCredentials) {

  const result = loginSchema.safeParse(credentials)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const supabase = await createClient()

  const data = {
    email: result.data.email,
    password: result.data.password,
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    return { error: error.message }
  }
  return {success: true}
}

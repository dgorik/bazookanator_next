'use server'
import { createClient } from '@/utils/supabase/server'

const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bazookanator.vercel.app'
    : 'http://localhost:3000';

export async function resetPassword(formData: { email: string }) {
    const supabase = await createClient()
    const email = formData.email
    const { data, error } = await supabase.auth.resetPasswordForEmail(email,  {
    })
    if (error) {
      return { error: error.message }
    }
    return
}
'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function resetPassword(formData: { email: string }) {
    const supabase = await createClient()
    const email = formData.email
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) {
      return { error: error.message }
    }
    return
}
'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

interface FormData {
  email: string
  password: string
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.email
  const password = formData.password

  const data = {
    email: email,
    password: password,
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    return { error: error.message }
  }
  
  return { message: "Signed out successfully" }
  // revalidatePath('/', 'layout') //not deleting yet - need to research what this is for
  redirect('/analytics')
}

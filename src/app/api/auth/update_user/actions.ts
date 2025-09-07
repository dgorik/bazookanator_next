"use server"

import { redirect } from 'next/navigation';
import { createClient } from "@/utils/supabase/server"

interface FormData {
  password: string
}

interface UpdateResponse{
    error?: string,
    success?: string
}

export async function updateUser(formData: FormData): Promise <UpdateResponse> {
  const { password } = formData
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "User not authenticated or session invalid" }
  }
  const { error } = await supabase.auth.updateUser({ password })
  
  if (error) {
    return { error: error.message }
  }

  const redirectUrl = new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL)
  redirectUrl.searchParams.set('success', 'Your password has been reset successfully, login in')
  redirect(`${redirectUrl}`)
}

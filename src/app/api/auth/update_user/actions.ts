"use server"

import { createClient } from "@/utils/supabase/server"

interface FormData {
  password: string
}

export async function updateUser(formData: FormData) {
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

  return { success: "Password updated successfully" }
}

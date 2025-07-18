"use server"

import { createClient } from "@/utils/supabase/server"

interface FormData {
  email: string
  password: string
  first_name: string
  last_name: string
}

export async function signup(formData: FormData) {

  const email = formData.email
  const password = formData.password
  const first_name = formData.first_name
  const last_name = formData.last_name

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: first_name,
        last_name: last_name,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return

}
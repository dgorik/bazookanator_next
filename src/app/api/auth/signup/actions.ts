"use server"

import { createClient } from "../../../../../utils/supabase/server"
import { redirect } from "next/navigation"

interface FormData {
  email: string
  password: string
  first_name: string
  last_name: string
}

export async function signupAction(formData: FormData) {

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

  redirect('/Member')

}
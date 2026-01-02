"use server"

import { createClient } from "@/src/lib/client/supabase/server"
import {signupSchema, type SignupCredentials} from "@/src/lib/validations/auth"

export async function signup(credentials: SignupCredentials) {

  const result = signupSchema.safeParse(credentials)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const supabase = await createClient()

  const {error} = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        first_name: result.data.firstName,
        last_name: result.data.lastName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return {success: true}

}
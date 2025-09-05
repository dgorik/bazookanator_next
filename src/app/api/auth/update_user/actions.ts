"use server"

import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/dist/server/api-utils'

interface FormData {
  password: string
}

export async function updateUser(formData: FormData) {

  const password = formData.password

  const supabase = await createClient()

  const { data, error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    return { error: error.message }
  }
  if(!error && data.user){
    return {success: 'Password updated successfully'}

  }

  return

}
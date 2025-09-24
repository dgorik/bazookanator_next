import { createClient } from '@/src/lib/client/supabase/client'

export const fetcher = async () => {
    const supabase = await createClient()
const { data, error } = await supabase.from("OP Database").select("*")
if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
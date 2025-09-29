import { createClient } from '@/src/lib/client/supabase/client'

export const fetcher = async () => {
    const supabase = await createClient()
const { data, error } = await supabase.rpc("get_converted_sales")
if (error) {
    throw new Error(error.message);
  }
  console.log(data)
  return data || [];
}
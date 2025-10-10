import { createClient } from '@/src/lib/client/supabase/server'

export async function getBrandComparisonData() {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('get_converted_sales')

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

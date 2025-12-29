import { createClient } from '@/src/lib/client/supabase/client'

/**
 * Get Supabase client instance.
 * Uses browser client for client-side usage (called from useSWR in client components).
 * Note: Client creation is lightweight - Supabase clients are just wrappers.
 * We create a new instance per call to ensure fresh state, but extract to helper
 * to avoid repetition and allow easy switching to server client if needed.
 */
function getSupabaseClient() {
  return createClient()
}

// Raw Data Fetcher
export const rawDataFetcher = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from('OP Database').select('*')
  return {
    user: data,
    isLoading: false,
    isError: error,
  }
}

export const getMeasuresFromProductData = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('product_data')
    .select('measure')
  
  if (error) throw error
  
  // Return unique measures
  const uniqueMeasures = Array.from(new Set(data.map(item => item.measure)))
  return uniqueMeasures
}
export const getMeasureTotal = async (measureName: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('product_data')
    .select('sales')
    .eq('measure', measureName)
  
  if (error) throw error
  console.log(data)
  return data
}


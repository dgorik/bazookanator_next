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

export const getMeasures = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.rpc('get_measures')
  if (error) throw error
  return data
}

export const getMeasureTotal = async (measureName: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.rpc('get_measure_total',{measure_name: measureName})
  if (error) throw error
  return data
}


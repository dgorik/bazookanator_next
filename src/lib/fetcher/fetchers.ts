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

// Brand Comparison Data Fetcher
interface Filters {
  measure1: string
  measure2: string
}

export const getBrandComparisonData = async (filters: Filters) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.rpc('get_converted_sales', {
    measure_1: filters.measure1,
    measure_2: filters.measure2,
  })
  if (error) throw error

  // Map the fixed columns to the selected measure names
  console.log(data)
  return data
}


export const getMeasures = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.rpc('get_measures')
  if (error) throw error
  return data
}


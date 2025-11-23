import { createClient } from '@/src/lib/client/supabase/client'

export const rawDataFetcher = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('OP Database').select('*')

  // Map the fixed columns to the selected measure names
  console.log(data)
  return {
    user: data,
    isLoading: false,
    isError: error
  }
}
import { createClient } from '@/src/lib/client/supabase/client'

interface Filters {
  measure1: string
  measure2: string
}

export const getBrandComparisonData = async (filters: Filters) => {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('get_converted_sales', {
    measure_1: filters.measure1,
    measure_2: filters.measure2,
  })
  if (error) throw error

  // Map the fixed columns to the selected measure names
  console.log(data)
  return data
}

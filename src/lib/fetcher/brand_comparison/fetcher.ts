import { createClient } from '@/src/lib/client/supabase/client'

// interface RpcRow {
//   brand: string
//   data: Record<string, number> 
// }

interface Filters {
  measure1: string
  measure2: string
}

export const fetcher = async ([, filters]: [string, Filters]) => {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("get_converted_sales", {
    measure_1: filters.measure1,
    measure_2: filters.measure2,
  })
  if (error) throw error
  console.log(data)
  return data  
}


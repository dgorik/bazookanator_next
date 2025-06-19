import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export async function connectSuperbase() {
  try {
    const { data, error } = await supabase
        .from('Test')
        .select()

    console.log("Superbase Connected: ", data);
  } catch (err) {
    console.error(err);
  }
}
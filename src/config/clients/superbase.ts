import { createClient } from '@supabase/supabase-js';

export const superbase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// ! are telling Typescript that env variables are defined
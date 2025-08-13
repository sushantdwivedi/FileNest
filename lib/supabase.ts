


import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://tklawqamfrnxtcfcyjov.supabase.co'
export const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

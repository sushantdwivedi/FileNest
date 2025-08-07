

import { SUPABASE_KEY } from '@env';


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tklawqamfrnxtcfcyjov.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
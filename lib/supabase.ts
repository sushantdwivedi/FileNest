import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tklawqamfrnxtcfcyjov.supabase.co";
export const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbGF3cWFtZnJueHRjZmN5am92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MDA1NTcsImV4cCI6MjA2OTk3NjU1N30.Rj1ddk0XyXYgaoM1ndFGHPbGDPDRELTr01W0Saa2O4Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);




// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://tklawqamfrnxtcfcyjov.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)
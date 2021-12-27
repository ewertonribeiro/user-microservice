import {createClient} from '@supabase/supabase-js';
import {config} from 'dotenv'

config()

const SupabaseSecret =process.env.SUPABASE_SECRET_URL as string
const SupabaseClient = process.env.SUPABASE_SECRET_KEY as string

export const supabase = createClient(SupabaseSecret, SupabaseClient)
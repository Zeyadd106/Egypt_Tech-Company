import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

let client: SupabaseClient | null = null

if (isSupabaseConfigured) {
  client = createClient(url as string, anonKey as string)
} else if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Egypt Tech] Supabase env vars missing — falling back to local demo data. ' +
      'Copy .env.example to .env and add VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.',
  )
}

/** Supabase client, or null when env is not configured (demo fallback mode). */
export const supabase: SupabaseClient | null = client

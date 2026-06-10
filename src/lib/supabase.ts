import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

type SupabaseAuthSettings = {
  external?: {
    google?: boolean
  }
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

export async function isGoogleAuthEnabled() {
  if (!supabaseUrl || !supabaseAnonKey) return false

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
      headers: {
        apikey: supabaseAnonKey,
      },
    })

    if (!response.ok) return false

    const settings = (await response.json()) as SupabaseAuthSettings
    return settings.external?.google === true
  } catch {
    return false
  }
}

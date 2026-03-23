import { createClient } from '@supabase/supabase-js'
import { env } from './env'

/**
 * Supabase client instance configured with environment variables
 * 
 * This client provides access to:
 * - Authentication (supabase.auth)
 * - Database operations (supabase.from())
 * - Real-time subscriptions
 * - Storage operations
 */
export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

/**
 * Convenience export for auth operations
 * 
 * Usage:
 * - auth.signInWithPassword({ email, password })
 * - auth.signOut()
 * - auth.getSession()
 */
export const auth = supabase.auth

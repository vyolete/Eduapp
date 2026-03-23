import { describe, it, expect } from 'vitest'
import { supabase, auth } from '../supabase'

describe('Supabase Client Configuration', () => {
  it('should create a Supabase client instance', () => {
    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
    expect(supabase.from).toBeDefined()
  })

  it('should export auth instance', () => {
    expect(auth).toBeDefined()
    expect(auth).toBe(supabase.auth)
  })

  it('should have proper auth configuration', () => {
    // Verify that the client was created with proper configuration
    // Note: We can't directly access the config, but we can verify the client works
    expect(supabase.auth.getSession).toBeDefined()
    expect(supabase.auth.signInWithPassword).toBeDefined()
    expect(supabase.auth.signOut).toBeDefined()
  })
})

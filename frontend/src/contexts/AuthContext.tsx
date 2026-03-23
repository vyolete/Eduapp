import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { auth } from '../lib/supabase'
import { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (email: string, password: string, role: UserRole) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export type UserRole = 'admin' | 'teacher' | 'student'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get session from Supabase
    const getSession = async () => {
      const { data: { session } } = await auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const logout = async () => {
    const { error } = await auth.signOut()
    if (error) throw error
  }

  const signUp = async (email: string, password: string, role: UserRole) => {
    const { error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
        },
      },
    })
    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    const { error } = await auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  const value = {
    user,
    session,
    isLoading,
    login,
    logout,
    signUp,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export interface User {
  id: string              // UUID from Supabase
  email: string
  role: UserRole
  name: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type UserRole = 'admin' | 'teacher' | 'student'

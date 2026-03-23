import { User } from './user'
import { Module } from './module'

export interface Group {
  id: string              // UUID
  course_id: string       // Foreign key
  name: string
  description?: string
  max_students?: number
  active: boolean
  created_at: string
  updated_at: string
  
  // Relations
  students?: User[]
  modules?: Module[]
}

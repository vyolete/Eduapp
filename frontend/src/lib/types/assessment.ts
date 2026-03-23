import { Grade } from './grade'

export interface Assessment {
  id: string              // UUID
  course_id: string       // Foreign key
  name: string
  pct: number             // Weight percentage (0-100)
  week: number            // Week number
  module: string          // Module name (or "Todos" for course projects)
  due_date?: string
  max_score: number
  description?: string
  created_at: string
  updated_at: string
  
  // Relations
  grades?: Grade[]
}

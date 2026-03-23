import { Class } from './class'
import { Material } from './material'

export interface Module {
  id: string              // UUID
  course_id: string       // Foreign key
  name: string
  color: string           // Hex color for UI
  notebook_url?: string   // Google Colab URL
  topics: string[]        // List of topic names
  order: number           // Display order
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  
  // Relations
  classes?: Class[]
  materials?: Material[]
}

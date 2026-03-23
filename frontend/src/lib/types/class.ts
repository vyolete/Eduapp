export interface Class {
  id: string              // UUID
  module_id: string       // Foreign key
  title: string
  type: ClassType
  content: string         // HTML content for text, URL for video/slides
  description?: string
  notebook_url?: string
  order: number
  duration_minutes?: number
  created_at: string
  updated_at: string
}

export type ClassType = 'text' | 'video' | 'slides' | 'pdf' | 'link'

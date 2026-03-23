export interface Material {
  id: string              // UUID
  module_id: string       // Foreign key
  title: string
  type: 'file' | 'link' | 'video'
  url: string
  description?: string
  order: number
  created_at: string
  updated_at: string
}

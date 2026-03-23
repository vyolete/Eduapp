import { Module } from './module'
import { Assessment } from './assessment'
import { Group } from './group'

export interface Course {
  id: string              // UUID
  name: string
  program: string
  credits: number
  teacher_id: string      // Foreign key to users
  competence: string
  description?: string
  status: 'active' | 'inactive' | 'draft'
  created_at: string
  updated_at: string
  
  // Relations
  modules?: Module[]
  assessments?: Assessment[]
  groups?: Group[]
}

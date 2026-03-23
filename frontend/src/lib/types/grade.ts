export interface Grade {
  id: string              // UUID
  assessment_id: string   // Foreign key
  student_id: string      // Foreign key
  score: number           // 0-100
  feedback?: string
  submitted_at?: string
  graded_at?: string
  grader_id?: string      // Teacher who graded
  created_at: string
  updated_at: string
}

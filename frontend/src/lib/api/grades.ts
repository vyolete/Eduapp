import { supabase } from '../supabase'
import { Grade } from '../types/grade'

export const gradesApi = {
  /**
   * Get all grades for a student
   */
  getByStudent: async (studentId: string) => {
    const { data, error } = await supabase
      .from('notas')
      .select(`
        *,
        evaluacion:evaluaciones(*),
        estudiante:usuarios(*)
      `)
      .eq('estudiante_id', studentId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Grade[]
  },

  /**
   * Get all grades for an assessment
   */
  getByAssessment: async (assessmentId: string) => {
    const { data, error } = await supabase
      .from('notas')
      .select(`
        *,
        estudiante:usuarios(*)
      `)
      .eq('evaluacion_id', assessmentId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Grade[]
  },

  /**
   * Create or update grade
   */
  upsert: async (grade: Partial<Grade>) => {
    const { data, error } = await supabase
      .from('notas')
      .upsert({
        estudiante_id: grade.student_id,
        evaluacion_id: grade.assessment_id,
        valor: grade.score,
        observacion: grade.feedback,
        registrado_por: grade.grader_id,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Grade
  },

  /**
   * Delete grade
   */
  delete: async (id: string) => {
    const { error } = await supabase
      .from('notas')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },
}

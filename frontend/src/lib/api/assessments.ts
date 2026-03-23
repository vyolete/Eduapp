import { supabase } from '../supabase'
import { Assessment } from '../types/assessment'

export const assessmentsApi = {
  /**
   * Get all assessments for a course
   */
  getByCourse: async (courseId: string) => {
    const { data, error } = await supabase
      .from('evaluaciones')
      .select(`
        *,
        notas:notas(*)
      `)
      .eq('curso_id', courseId)
      .eq('activo', true)
      .order('semana', { ascending: true })
    
    if (error) throw error
    return data as Assessment[]
  },

  /**
   * Get assessment by ID
   */
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('evaluaciones')
      .select(`
        *,
        notas:notas(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Assessment
  },

  /**
   * Create new assessment
   */
  create: async (assessment: Partial<Assessment>) => {
    const { data, error } = await supabase
      .from('evaluaciones')
      .insert({
        curso_id: assessment.course_id,
        nombre: assessment.name,
        porcentaje: assessment.pct,
        semana: assessment.week,
        descripcion: assessment.description,
        activo: true,
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Assessment
  },

  /**
   * Update assessment
   */
  update: async (id: string, assessment: Partial<Assessment>) => {
    const { data, error } = await supabase
      .from('evaluaciones')
      .update({
        nombre: assessment.name,
        porcentaje: assessment.pct,
        semana: assessment.week,
        descripcion: assessment.description,
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Assessment
  },

  /**
   * Delete assessment (soft delete)
   */
  delete: async (id: string) => {
    const { error } = await supabase
      .from('evaluaciones')
      .update({ activo: false })
      .eq('id', id)
    
    if (error) throw error
  },
}

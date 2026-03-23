import { supabase } from '../supabase'
import { Group } from '../types/group'

export const groupsApi = {
  /**
   * Get all groups for a course
   */
  getByCourse: async (courseId: string) => {
    const { data, error } = await supabase
      .from('grupos')
      .select(`
        *,
        curso:cursos(*),
        grupo_estudiantes:grupo_estudiantes(
          estudiante:usuarios(*)
        )
      `)
      .eq('curso_id', courseId)
      .eq('activo', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Group[]
  },

  /**
   * Get group by ID
   */
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('grupos')
      .select(`
        *,
        curso:cursos(*),
        grupo_estudiantes:grupo_estudiantes(
          estudiante:usuarios(*)
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Group
  },

  /**
   * Create new group
   */
  create: async (group: Partial<Group>) => {
    const { data, error } = await supabase
      .from('grupos')
      .insert({
        nombre: group.name,
        curso_id: group.course_id,
        activo: true,
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Group
  },

  /**
   * Update group
   */
  update: async (id: string, group: Partial<Group>) => {
    const { data, error } = await supabase
      .from('grupos')
      .update({
        nombre: group.name,
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Group
  },

  /**
   * Add student to group
   */
  addStudent: async (groupId: string, studentId: string) => {
    const { error } = await supabase
      .from('grupo_estudiantes')
      .insert({
        grupo_id: groupId,
        estudiante_id: studentId,
      })
    
    if (error) throw error
  },

  /**
   * Remove student from group
   */
  removeStudent: async (groupId: string, studentId: string) => {
    const { error } = await supabase
      .from('grupo_estudiantes')
      .delete()
      .eq('grupo_id', groupId)
      .eq('estudiante_id', studentId)
    
    if (error) throw error
  },

  /**
   * Delete group (soft delete)
   */
  delete: async (id: string) => {
    const { error } = await supabase
      .from('grupos')
      .update({ activo: false })
      .eq('id', id)
    
    if (error) throw error
  },
}

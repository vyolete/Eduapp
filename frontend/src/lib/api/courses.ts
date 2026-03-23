import { supabase } from '../supabase'
import { Course } from '../types/course'

export const coursesApi = {
  /**
   * Get all courses
   */
  getAll: async () => {
    const { data, error } = await supabase
      .from('cursos')
      .select(`
        *,
        modulos:modulos(*),
        evaluaciones:evaluaciones(*),
        grupos:grupos(*)
      `)
      .eq('activo', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Course[]
  },

  /**
   * Get course by ID with all relations
   */
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('cursos')
      .select(`
        *,
        modulos:modulos(*),
        evaluaciones:evaluaciones(*),
        grupos:grupos(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Course
  },

  /**
   * Create new course
   */
  create: async (course: Partial<Course>) => {
    const { data, error } = await supabase
      .from('cursos')
      .insert({
        nombre: course.name,
        programa: course.program,
        creditos: course.credits,
        docente_id: course.teacher_id,
        competencia: course.competence,
        activo: true,
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Course
  },

  /**
   * Update course
   */
  update: async (id: string, course: Partial<Course>) => {
    const { data, error } = await supabase
      .from('cursos')
      .update({
        nombre: course.name,
        programa: course.program,
        creditos: course.credits,
        docente_id: course.teacher_id,
        competencia: course.competence,
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Course
  },

  /**
   * Delete course (soft delete)
   */
  delete: async (id: string) => {
    const { error } = await supabase
      .from('cursos')
      .update({ activo: false })
      .eq('id', id)
    
    if (error) throw error
  },
}

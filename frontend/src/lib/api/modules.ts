import { supabase } from '../supabase'
import { Module } from '../types/module'

export const modulesApi = {
  /**
   * Get all modules for a course
   */
  getByCourse: async (courseId: string) => {
    const { data, error } = await supabase
      .from('modulos')
      .select(`
        *,
        temas:temas(*),
        materiales:materiales(*)
      `)
      .eq('curso_id', courseId)
      .eq('activo', true)
      .order('orden', { ascending: true })
    
    if (error) throw error
    return data as Module[]
  },

  /**
   * Get module by ID
   */
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('modulos')
      .select(`
        *,
        temas:temas(*),
        materiales:materiales(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Module
  },

  /**
   * Create new module
   */
  create: async (module: Partial<Module>) => {
    const { data, error } = await supabase
      .from('modulos')
      .insert({
        curso_id: module.course_id,
        nombre: module.name,
        color: module.color || '#7c6af7',
        notebook_url: module.notebook_url,
        orden: module.order || 0,
        activo: true,
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Module
  },

  /**
   * Update module
   */
  update: async (id: string, module: Partial<Module>) => {
    const { data, error } = await supabase
      .from('modulos')
      .update({
        nombre: module.name,
        color: module.color,
        notebook_url: module.notebook_url,
        orden: module.order,
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Module
  },

  /**
   * Delete module (soft delete)
   */
  delete: async (id: string) => {
    const { error } = await supabase
      .from('modulos')
      .update({ activo: false })
      .eq('id', id)
    
    if (error) throw error
  },
}

import { create } from 'zustand'
import { Module } from '../lib/types/module'
import { modulesApi } from '../lib/api'

interface ModuleState {
  modules: Module[]
  activeModule: Module | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchModules: (courseId?: string) => Promise<void>
  fetchModuleById: (id: string) => Promise<void>
  createModule: (module: Partial<Module>) => Promise<void>
  updateModule: (id: string, module: Partial<Module>) => Promise<void>
  deleteModule: (id: string) => Promise<void>
  setActiveModule: (module: Module | null) => void
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  modules: [],
  activeModule: null,
  isLoading: false,
  error: null,
  
  fetchModules: async (courseId) => {
    if (!courseId) {
      set({ modules: [], isLoading: false })
      return
    }
    
    set({ isLoading: true, error: null })
    try {
      const modules = await modulesApi.getByCourse(courseId)
      set({ modules, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch modules:', error)
      set({ error: 'Failed to fetch modules', isLoading: false })
    }
  },
  
  fetchModuleById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const module = await modulesApi.getById(id)
      set({ activeModule: module, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch module:', error)
      set({ error: 'Failed to fetch module', isLoading: false })
    }
  },
  
  createModule: async (module) => {
    set({ isLoading: true, error: null })
    try {
      const newModule = await modulesApi.create(module)
      set({ modules: [...get().modules, newModule], isLoading: false })
    } catch (error) {
      console.error('Failed to create module:', error)
      set({ error: 'Failed to create module', isLoading: false })
      throw error
    }
  },
  
  updateModule: async (id, module) => {
    set({ isLoading: true, error: null })
    try {
      const updatedModule = await modulesApi.update(id, module)
      set({ 
        modules: get().modules.map(m => m.id === id ? updatedModule : m),
        activeModule: get().activeModule?.id === id ? updatedModule : get().activeModule,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to update module:', error)
      set({ error: 'Failed to update module', isLoading: false })
      throw error
    }
  },
  
  deleteModule: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await modulesApi.delete(id)
      set({ 
        modules: get().modules.filter(m => m.id !== id),
        activeModule: get().activeModule?.id === id ? null : get().activeModule,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to delete module:', error)
      set({ error: 'Failed to delete module', isLoading: false })
      throw error
    }
  },
  
  setActiveModule: (module) => set({ activeModule: module }),
}))

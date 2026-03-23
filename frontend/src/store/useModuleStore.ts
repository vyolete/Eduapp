import { create } from 'zustand'
import { Module } from '../lib/types/module'

interface ModuleState {
  modules: Module[]
  activeModule: Module | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchModules: (courseId?: string) => Promise<void>
  fetchModuleById: (id: string) => Promise<void>
  createModule: (module: Module) => Promise<void>
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
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.get<Module[]>(`/modules${courseId ? `?course_id=${courseId}` : ''}`)
      // set({ modules: response.data || [], isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch modules', isLoading: false })
    }
  },
  
  fetchModuleById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.get<Module>(`/modules/${id}`)
      // set({ activeModule: response.data || null, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch module', isLoading: false })
    }
  },
  
  createModule: async (module) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.post<Module>('/modules', module)
      // set({ modules: [...get().modules, response.data!], isLoading: false })
    } catch (error) {
      set({ error: 'Failed to create module', isLoading: false })
    }
  },
  
  updateModule: async (id, module) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.put<Module>(`/modules/${id}`, module)
      // set({ 
      //   modules: get().modules.map(m => m.id === id ? response.data! : m),
      //   activeModule: get().activeModule?.id === id ? response.data! : get().activeModule,
      //   isLoading: false 
      // })
    } catch (error) {
      set({ error: 'Failed to update module', isLoading: false })
    }
  },
  
  deleteModule: async (id) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // await apiClient.delete(`/modules/${id}`)
      // set({ 
      //   modules: get().modules.filter(m => m.id !== id),
      //   activeModule: get().activeModule?.id === id ? null : get().activeModule,
      //   isLoading: false 
      // })
    } catch (error) {
      set({ error: 'Failed to delete module', isLoading: false })
    }
  },
  
  setActiveModule: (module) => set({ activeModule: module }),
}))

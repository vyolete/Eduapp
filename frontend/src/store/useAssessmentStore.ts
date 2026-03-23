import { create } from 'zustand'
import { Assessment } from '../lib/types/assessment'
import { assessmentsApi } from '../lib/api'

interface AssessmentState {
  assessments: Assessment[]
  activeAssessment: Assessment | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchAssessments: (courseId?: string) => Promise<void>
  fetchAssessmentById: (id: string) => Promise<void>
  createAssessment: (assessment: Partial<Assessment>) => Promise<void>
  updateAssessment: (id: string, assessment: Partial<Assessment>) => Promise<void>
  deleteAssessment: (id: string) => Promise<void>
  setActiveAssessment: (assessment: Assessment | null) => void
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  assessments: [],
  activeAssessment: null,
  isLoading: false,
  error: null,
  
  fetchAssessments: async (courseId) => {
    if (!courseId) {
      set({ assessments: [], isLoading: false })
      return
    }
    
    set({ isLoading: true, error: null })
    try {
      const assessments = await assessmentsApi.getByCourse(courseId)
      set({ assessments, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch assessments:', error)
      set({ error: 'Failed to fetch assessments', isLoading: false })
    }
  },
  
  fetchAssessmentById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const assessment = await assessmentsApi.getById(id)
      set({ activeAssessment: assessment, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch assessment:', error)
      set({ error: 'Failed to fetch assessment', isLoading: false })
    }
  },
  
  createAssessment: async (assessment) => {
    set({ isLoading: true, error: null })
    try {
      const newAssessment = await assessmentsApi.create(assessment)
      set({ assessments: [...get().assessments, newAssessment], isLoading: false })
    } catch (error) {
      console.error('Failed to create assessment:', error)
      set({ error: 'Failed to create assessment', isLoading: false })
      throw error
    }
  },
  
  updateAssessment: async (id, assessment) => {
    set({ isLoading: true, error: null })
    try {
      const updatedAssessment = await assessmentsApi.update(id, assessment)
      set({ 
        assessments: get().assessments.map(a => a.id === id ? updatedAssessment : a),
        activeAssessment: get().activeAssessment?.id === id ? updatedAssessment : get().activeAssessment,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to update assessment:', error)
      set({ error: 'Failed to update assessment', isLoading: false })
      throw error
    }
  },
  
  deleteAssessment: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await assessmentsApi.delete(id)
      set({ 
        assessments: get().assessments.filter(a => a.id !== id),
        activeAssessment: get().activeAssessment?.id === id ? null : get().activeAssessment,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to delete assessment:', error)
      set({ error: 'Failed to delete assessment', isLoading: false })
      throw error
    }
  },
  
  setActiveAssessment: (assessment) => set({ activeAssessment: assessment }),
}))

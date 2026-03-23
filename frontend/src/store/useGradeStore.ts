import { create } from 'zustand'
import { Grade } from '../lib/types/grade'
import { gradesApi } from '../lib/api'

interface GradeState {
  grades: Grade[]
  activeGrade: Grade | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchGrades: (studentId?: string, assessmentId?: string) => Promise<void>
  fetchGradeById: (id: string) => Promise<void>
  upsertGrade: (grade: Partial<Grade>) => Promise<void>
  deleteGrade: (id: string) => Promise<void>
  setActiveGrade: (grade: Grade | null) => void
}

export const useGradeStore = create<GradeState>((set, get) => ({
  grades: [],
  activeGrade: null,
  isLoading: false,
  error: null,
  
  fetchGrades: async (studentId, assessmentId) => {
    set({ isLoading: true, error: null })
    try {
      let grades: Grade[] = []
      
      if (studentId) {
        grades = await gradesApi.getByStudent(studentId)
      } else if (assessmentId) {
        grades = await gradesApi.getByAssessment(assessmentId)
      }
      
      set({ grades, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch grades:', error)
      set({ error: 'Failed to fetch grades', isLoading: false })
    }
  },
  
  fetchGradeById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const grade = get().grades.find(g => g.id === id)
      set({ activeGrade: grade || null, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch grade:', error)
      set({ error: 'Failed to fetch grade', isLoading: false })
    }
  },
  
  upsertGrade: async (grade) => {
    set({ isLoading: true, error: null })
    try {
      const savedGrade = await gradesApi.upsert(grade)
      const existing = get().grades.find(g => g.id === savedGrade.id)
      
      if (existing) {
        set({ grades: get().grades.map(g => g.id === savedGrade.id ? savedGrade : g), isLoading: false })
      } else {
        set({ grades: [...get().grades, savedGrade], isLoading: false })
      }
    } catch (error) {
      console.error('Failed to save grade:', error)
      set({ error: 'Failed to save grade', isLoading: false })
      throw error
    }
  },
  
  deleteGrade: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await gradesApi.delete(id)
      set({ 
        grades: get().grades.filter(g => g.id !== id),
        activeGrade: get().activeGrade?.id === id ? null : get().activeGrade,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to delete grade:', error)
      set({ error: 'Failed to delete grade', isLoading: false })
      throw error
    }
  },
  
  setActiveGrade: (grade) => set({ activeGrade: grade }),
}))

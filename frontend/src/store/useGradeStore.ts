import { create } from 'zustand'
import { Grade } from '../lib/types/grade'

interface GradeState {
  grades: Grade[]
  activeGrade: Grade | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchGrades: (studentId?: string, assessmentId?: string) => Promise<void>
  fetchGradeById: (id: string) => Promise<void>
  createGrade: (grade: Grade) => Promise<void>
  updateGrade: (id: string, grade: Partial<Grade>) => Promise<void>
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
      // TODO: Implement API call
      // const params = new URLSearchParams()
      // if (studentId) params.append('student_id', studentId)
      // if (assessmentId) params.append('assessment_id', assessmentId)
      // const response = await apiClient.get<Grade[]>(`/grades${params.toString() ? `?${params.toString()}` : ''}`)
      // set({ grades: response.data || [], isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch grades', isLoading: false })
    }
  },
  
  fetchGradeById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.get<Grade>(`/grades/${id}`)
      // set({ activeGrade: response.data || null, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch grade', isLoading: false })
    }
  },
  
  createGrade: async (grade) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.post<Grade>('/grades', grade)
      // set({ grades: [...get().grades, response.data!], isLoading: false })
    } catch (error) {
      set({ error: 'Failed to create grade', isLoading: false })
    }
  },
  
  updateGrade: async (id, grade) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.put<Grade>(`/grades/${id}`, grade)
      // set({ 
      //   grades: get().grades.map(g => g.id === id ? response.data! : g),
      //   activeGrade: get().activeGrade?.id === id ? response.data! : get().activeGrade,
      //   isLoading: false 
      // })
    } catch (error) {
      set({ error: 'Failed to update grade', isLoading: false })
    }
  },
  
  deleteGrade: async (id) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // await apiClient.delete(`/grades/${id}`)
      // set({ grades: get().grades.filter(g => g.id !== id), isLoading: false })
    } catch (error) {
      set({ error: 'Failed to delete grade', isLoading: false })
    }
  },
  
  setActiveGrade: (grade) => set({ activeGrade: grade }),
}))

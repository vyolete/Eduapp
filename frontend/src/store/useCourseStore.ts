import { create } from 'zustand'
import { Course } from '../lib/types/course'

interface CourseState {
  courses: Course[]
  activeCourse: Course | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchCourses: () => Promise<void>
  fetchCourseById: (id: string) => Promise<void>
  createCourse: (course: Course) => Promise<void>
  updateCourse: (id: string, course: Partial<Course>) => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  setActiveCourse: (course: Course | null) => void
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  activeCourse: null,
  isLoading: false,
  error: null,
  
  fetchCourses: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.get<Course[]>('/courses')
      // set({ courses: response.data || [], isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch courses', isLoading: false })
    }
  },
  
  fetchCourseById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.get<Course>(`/courses/${id}`)
      // set({ activeCourse: response.data || null, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch course', isLoading: false })
    }
  },
  
  createCourse: async (course) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.post<Course>('/courses', course)
      // set({ courses: [...get().courses, response.data!], isLoading: false })
    } catch (error) {
      set({ error: 'Failed to create course', isLoading: false })
    }
  },
  
  updateCourse: async (id, course) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // const response = await apiClient.put<Course>(`/courses/${id}`, course)
      // set({ 
      //   courses: get().courses.map(c => c.id === id ? response.data! : c),
      //   activeCourse: get().activeCourse?.id === id ? response.data! : get().activeCourse,
      //   isLoading: false 
      // })
    } catch (error) {
      set({ error: 'Failed to update course', isLoading: false })
    }
  },
  
  deleteCourse: async (id) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement API call
      // await apiClient.delete(`/courses/${id}`)
      // set({ 
      //   courses: get().courses.filter(c => c.id !== id),
      //   activeCourse: get().activeCourse?.id === id ? null : get().activeCourse,
      //   isLoading: false 
      // })
    } catch (error) {
      set({ error: 'Failed to delete course', isLoading: false })
    }
  },
  
  setActiveCourse: (course) => set({ activeCourse: course }),
}))

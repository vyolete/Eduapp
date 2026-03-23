import { create } from 'zustand'
import { Course } from '../lib/types/course'
import { coursesApi } from '../lib/api'

interface CourseState {
  courses: Course[]
  activeCourse: Course | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchCourses: () => Promise<void>
  fetchCourseById: (id: string) => Promise<void>
  createCourse: (course: Partial<Course>) => Promise<void>
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
      const courses = await coursesApi.getAll()
      set({ courses, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch courses:', error)
      set({ error: 'Failed to fetch courses', isLoading: false })
    }
  },
  
  fetchCourseById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const course = await coursesApi.getById(id)
      set({ activeCourse: course, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch course:', error)
      set({ error: 'Failed to fetch course', isLoading: false })
    }
  },
  
  createCourse: async (course) => {
    set({ isLoading: true, error: null })
    try {
      const newCourse = await coursesApi.create(course)
      set({ courses: [...get().courses, newCourse], isLoading: false })
    } catch (error) {
      console.error('Failed to create course:', error)
      set({ error: 'Failed to create course', isLoading: false })
      throw error
    }
  },
  
  updateCourse: async (id, course) => {
    set({ isLoading: true, error: null })
    try {
      const updatedCourse = await coursesApi.update(id, course)
      set({ 
        courses: get().courses.map(c => c.id === id ? updatedCourse : c),
        activeCourse: get().activeCourse?.id === id ? updatedCourse : get().activeCourse,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to update course:', error)
      set({ error: 'Failed to update course', isLoading: false })
      throw error
    }
  },
  
  deleteCourse: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await coursesApi.delete(id)
      set({ 
        courses: get().courses.filter(c => c.id !== id),
        activeCourse: get().activeCourse?.id === id ? null : get().activeCourse,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to delete course:', error)
      set({ error: 'Failed to delete course', isLoading: false })
      throw error
    }
  },
  
  setActiveCourse: (course) => set({ activeCourse: course }),
}))

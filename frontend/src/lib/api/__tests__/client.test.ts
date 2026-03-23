import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { apiClient } from '../client'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('HTTP Methods', () => {
    it('should make GET requests', async () => {
      const mockData = { id: 1, name: 'Test' }
      const mockResponse = { data: mockData, status: 200 }
      
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      })

      const result = await apiClient.get('/test')
      
      expect(result.data).toEqual(mockData)
      expect(result.error).toBeNull()
      expect(result.status).toBe(200)
    })

    it('should make POST requests', async () => {
      const mockData = { id: 1, name: 'Created' }
      const mockResponse = { data: mockData, status: 201 }
      
      mockedAxios.create.mockReturnValue({
        post: vi.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      })

      const result = await apiClient.post('/test', { name: 'Created' })
      
      expect(result.data).toEqual(mockData)
      expect(result.error).toBeNull()
      expect(result.status).toBe(201)
    })

    it('should make PUT requests', async () => {
      const mockData = { id: 1, name: 'Updated' }
      const mockResponse = { data: mockData, status: 200 }
      
      mockedAxios.create.mockReturnValue({
        put: vi.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      })

      const result = await apiClient.put('/test/1', { name: 'Updated' })
      
      expect(result.data).toEqual(mockData)
      expect(result.error).toBeNull()
      expect(result.status).toBe(200)
    })

    it('should make DELETE requests', async () => {
      const mockResponse = { data: null, status: 204 }
      
      mockedAxios.create.mockReturnValue({
        delete: vi.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      })

      const result = await apiClient.delete('/test/1')
      
      expect(result.error).toBeNull()
      expect(result.status).toBe(204)
    })
  })

  describe('Error Handling', () => {
    it('should handle server errors', async () => {
      const mockError = {
        response: {
          status: 500,
          data: {
            message: 'Internal server error',
            code: 'SERVER_ERROR',
          },
        },
      }
      
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      })

      const result = await apiClient.get('/test')
      
      expect(result.data).toBeNull()
      expect(result.error).toEqual({
        message: 'Internal server error',
        code: 'SERVER_ERROR',
        details: undefined,
      })
      expect(result.status).toBe(500)
    })

    it('should handle network errors', async () => {
      const mockError = {
        request: {},
        message: 'Network Error',
      }
      
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      })

      const result = await apiClient.get('/test')
      
      expect(result.data).toBeNull()
      expect(result.error).toEqual({
        message: 'No response received from server',
        code: 'NO_RESPONSE',
      })
      expect(result.status).toBe(0)
    })

    it('should handle validation errors', async () => {
      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: { field: 'email', error: 'Invalid format' },
          },
        },
      }
      
      mockedAxios.create.mockReturnValue({
        post: vi.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      })

      const result = await apiClient.post('/test', {})
      
      expect(result.data).toBeNull()
      expect(result.error?.code).toBe('VALIDATION_ERROR')
      expect(result.error?.details).toEqual({ field: 'email', error: 'Invalid format' })
      expect(result.status).toBe(400)
    })
  })

  describe('Type Safety', () => {
    it('should return typed responses', async () => {
      interface User {
        id: number
        name: string
        email: string
      }

      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      }
      
      const mockResponse = { data: mockUser, status: 200 }
      
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() },
        },
      })

      const result = await apiClient.get<User>('/users/1')
      
      expect(result.data).toEqual(mockUser)
      if (result.data) {
        expect(result.data.id).toBe(1)
        expect(result.data.name).toBe('John Doe')
        expect(result.data.email).toBe('john@example.com')
      }
    })
  })
})

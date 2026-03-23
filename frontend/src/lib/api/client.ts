import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { env } from '../env'

export interface APIResponse<T> {
  data: T | null
  error: APIError | null
  status: number
}

export interface APIError {
  message: string
  code: string
  details?: any
}

export interface APIClient {
  get<T>(path: string, config?: AxiosRequestConfig): Promise<APIResponse<T>>
  post<T>(path: string, body?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>>
  put<T>(path: string, body?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>>
  delete<T>(path: string, config?: AxiosRequestConfig): Promise<APIResponse<T>>
}

class HttpClient implements APIClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear session and redirect to login
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await this.client.get<T>(path, config)
      return { data: response.data, error: null, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async post<T>(path: string, body?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await this.client.post<T>(path, body, config)
      return { data: response.data, error: null, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async put<T>(path: string, body?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await this.client.put<T>(path, body, config)
      return { data: response.data, error: null, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await this.client.delete<T>(path, config)
      return { data: response.data, error: null, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  private handleError(error: AxiosError): APIResponse<never> {
    if (error.response) {
      return {
        data: null,
        error: {
          message: error.response.data?.message || 'An error occurred',
          code: error.response.data?.code || 'UNKNOWN_ERROR',
          details: error.response.data?.details,
        },
        status: error.response.status,
      }
    } else if (error.request) {
      return {
        data: null,
        error: {
          message: 'No response received from server',
          code: 'NO_RESPONSE',
        },
        status: 0,
      }
    } else {
      return {
        data: null,
        error: {
          message: error.message || 'An error occurred',
          code: 'REQUEST_ERROR',
        },
        status: 0,
      }
    }
  }
}

export const apiClient = new HttpClient(env.apiUrl)

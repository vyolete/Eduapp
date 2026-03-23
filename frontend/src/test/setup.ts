import { expect, afterEach, beforeAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

// Mock environment variables for tests
beforeAll(() => {
  // Mock import.meta.env with test values
  vi.stubGlobal('import', {
    meta: {
      env: {
        VITE_SUPABASE_URL: 'https://test.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'test-anon-key',
        VITE_API_BASE_URL: 'https://test-api.example.com',
        VITE_APP_NAME: 'EduApp ITM Test',
        VITE_APP_URL: 'https://test.example.com',
      },
    },
  })
})

// Cleanup after each test
afterEach(() => {
  cleanup()
})

export const getEnvVariable = (name: string): string => {
  const value = import.meta.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  supabaseUrl: getEnvVariable('VITE_SUPABASE_URL'),
  supabaseAnonKey: getEnvVariable('VITE_SUPABASE_ANON_KEY'),
  apiUrl: getEnvVariable('VITE_API_BASE_URL'),
  appName: getEnvVariable('VITE_APP_NAME'),
  appUrl: getEnvVariable('VITE_APP_URL'),
}

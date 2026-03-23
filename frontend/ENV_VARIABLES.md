# Environment Variables Documentation

## Overview

This document provides comprehensive information about environment variables used in the EduApp ITM frontend application.

## Quick Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_SUPABASE_URL` | ✅ Yes | - | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ Yes | - | Supabase anonymous/public key |
| `VITE_API_BASE_URL` | ⚠️ Optional | `http://localhost:3000/api` | Backend API base URL |
| `VITE_APP_NAME` | ⚠️ Optional | `"EduApp ITM"` | Application display name |
| `VITE_APP_URL` | ⚠️ Optional | `http://localhost:5173` | Application URL |

## Configuration Files

### `.env.example`
Template file with placeholder values. This file is committed to version control and serves as documentation for required environment variables.

### `.env.local`
Local environment configuration file. This file contains your actual credentials and should **never** be committed to version control (it's in `.gitignore`).

### `.env.template`
Detailed template with instructions and examples. Use this as a reference when setting up your environment.

## Setup Instructions

### 1. Create Local Environment File

```bash
cd frontend
cp .env.example .env.local
```

### 2. Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Update `.env.local`

Replace the placeholder values with your actual credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

### 4. Restart Development Server

```bash
npm run dev
```

## Variable Details

### VITE_SUPABASE_URL

**Type**: String (URL)  
**Required**: Yes  
**Example**: `https://abcdefghijklmnop.supabase.co`

Your Supabase project URL. This is used to connect to your Supabase database and services.

**Where to find**:
- Supabase Dashboard → Settings → API → Project URL

**Usage in code**:
```typescript
import { env } from './lib/env'
console.log(env.supabaseUrl) // https://xxxxx.supabase.co
```

### VITE_SUPABASE_ANON_KEY

**Type**: String (JWT)  
**Required**: Yes  
**Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

Your Supabase anonymous/public key. This key is safe to use in the browser as it's protected by Row Level Security (RLS) policies.

**Where to find**:
- Supabase Dashboard → Settings → API → Project API keys → `anon` `public`

**Security notes**:
- ✅ Safe to use in browser/client-side code
- ✅ Protected by RLS policies
- ❌ Do NOT use the `service_role` key in the frontend

**Usage in code**:
```typescript
import { env } from './lib/env'
console.log(env.supabaseAnonKey) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### VITE_API_BASE_URL

**Type**: String (URL)  
**Required**: Optional  
**Default**: `http://localhost:3000/api`  
**Example**: `https://api.eduapp-itm.com/api`

Base URL for the backend API. Used if you have a separate backend service.

**Usage in code**:
```typescript
import { env } from './lib/env'
const response = await fetch(`${env.apiUrl}/courses`)
```

### VITE_APP_NAME

**Type**: String  
**Required**: Optional  
**Default**: `"EduApp ITM"`  
**Example**: `"EduApp ITM - Development"`

Application display name shown in the UI (header, footer, login page).

**Usage in code**:
```typescript
import { env } from './lib/env'
<h1>{env.appName}</h1>
```

### VITE_APP_URL

**Type**: String (URL)  
**Required**: Optional  
**Default**: `http://localhost:5173`  
**Example**: `https://eduapp-itm.com`

Application URL used for redirects, links, and OAuth callbacks.

**Usage in code**:
```typescript
import { env } from './lib/env'
const redirectUrl = `${env.appUrl}/auth/callback`
```

## How Environment Variables Work

### Vite Environment Variables

Vite exposes environment variables to your client-side code through `import.meta.env`. Only variables prefixed with `VITE_` are exposed to prevent accidentally leaking sensitive server-side variables.

**Example**:
```typescript
// ✅ Accessible in client code
console.log(import.meta.env.VITE_SUPABASE_URL)

// ❌ NOT accessible (no VITE_ prefix)
console.log(import.meta.env.DATABASE_PASSWORD)
```

### Type-Safe Environment Variables

The application uses a type-safe wrapper in `src/lib/env.ts`:

```typescript
export const env = {
  supabaseUrl: getEnvVariable('VITE_SUPABASE_URL'),
  supabaseAnonKey: getEnvVariable('VITE_SUPABASE_ANON_KEY'),
  apiUrl: getEnvVariable('VITE_API_BASE_URL'),
  appName: getEnvVariable('VITE_APP_NAME'),
  appUrl: getEnvVariable('VITE_APP_URL'),
}
```

This provides:
- ✅ Type safety
- ✅ Validation at startup
- ✅ Clear error messages for missing variables
- ✅ Centralized configuration

## Troubleshooting

### Variables Not Loading

**Symptoms**: `undefined` values or "Missing required environment variable" errors

**Solutions**:
1. Ensure variables start with `VITE_` prefix
2. Restart the dev server after changing `.env.local`
3. Check that `.env.local` exists in the `frontend/` directory
4. Verify no syntax errors in `.env.local` (no quotes needed)

### Supabase Connection Errors

**Symptoms**: "Invalid API key" or "Failed to fetch" errors

**Solutions**:
1. Verify your Supabase project is active (not paused)
2. Check that the URL and anon key are correct
3. Ensure you copied the entire anon key (it's very long!)
4. Verify you're using the `anon` key, not `service_role`

### Changes Not Reflected

**Symptoms**: Updated values not showing in the application

**Solutions**:
1. Restart the development server (`Ctrl+C` then `npm run dev`)
2. Clear browser cache and hard reload (`Ctrl+Shift+R` or `Cmd+Shift+R`)
3. Check browser console for any errors

## Security Best Practices

### ✅ DO

- Use `.env.local` for local development
- Keep `.env.local` in `.gitignore`
- Use the `anon` key for client-side code
- Validate environment variables at startup
- Use different credentials for development and production

### ❌ DON'T

- Commit `.env.local` to version control
- Use `service_role` key in the frontend
- Share credentials in chat or email
- Hardcode credentials in source code
- Use production credentials in development

## Production Deployment

### Vercel

Set environment variables in the Vercel dashboard:

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add each variable with its production value
4. Redeploy your application

### Other Platforms

Most hosting platforms provide a way to set environment variables:

- **Netlify**: Site settings → Build & deploy → Environment
- **AWS Amplify**: App settings → Environment variables
- **Render**: Environment → Environment Variables

## Additional Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Supabase API Documentation](https://supabase.com/docs/guides/api)
- [Frontend README](README.md)
- [Setup Guide](SETUP.md)

## Support

For issues or questions:

1. Check the [SETUP.md](SETUP.md) guide
2. Review the [README.md](README.md) troubleshooting section
3. Check the browser console for specific error messages
4. Verify your Supabase project status in the dashboard

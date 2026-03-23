# EduApp ITM - Frontend

React-based educational platform for ITM (Institución Universitaria) with Supabase backend integration.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

## Environment Setup

### 1. Configure Environment Variables

The application requires Supabase credentials to connect to the backend. Follow these steps:

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to your [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Navigate to **Settings** → **API**
   - Copy the **Project URL** and **anon/public key**

3. Update `.env.local` with your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `VITE_API_BASE_URL` | Backend API base URL (optional) | `http://localhost:3000/api` |
| `VITE_APP_NAME` | Application name | `EduApp ITM` |
| `VITE_APP_URL` | Application URL | `http://localhost:5173` |

**Important Notes:**
- Never commit `.env.local` to version control (it's already in `.gitignore`)
- The `VITE_` prefix is required for Vite to expose variables to the client
- Restart the dev server after changing environment variables

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and API clients
│   ├── contexts/       # React Context providers
│   ├── store/          # State management
│   └── App.tsx         # Main application component
├── public/             # Static assets
└── .env.local          # Local environment variables (not in git)
```

## User Roles

The platform supports three user roles:

- **Admin**: Full system access (Dashboard, Courses, Modules, Groups, Users, Reports)
- **Teacher**: Course content management (Dashboard, Modules, Assessments, Groups)
- **Student**: Read-only learning content (My Course, Modules, Assessments, Grades)

## Troubleshooting

### Environment Variables Not Loading

If environment variables aren't working:

1. Ensure variables start with `VITE_` prefix
2. Restart the dev server after changing `.env.local`
3. Check that `.env.local` exists in the `frontend/` directory
4. Verify no syntax errors in `.env.local` (no quotes needed for values)

### Supabase Connection Issues

If you can't connect to Supabase:

1. Verify your Supabase project is active
2. Check that the URL and anon key are correct
3. Ensure your Supabase project has the required tables (see `supabase-setup.sql`)
4. Check browser console for specific error messages

## Support

For issues or questions, please refer to the project documentation in `.kiro/specs/architecture-documentation/`

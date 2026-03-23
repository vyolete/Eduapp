# Environment Setup Checklist

Use this checklist to verify your environment is properly configured.

## Pre-Setup Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Supabase account created
- [ ] Supabase project created

## Configuration Checklist

### 1. Environment Files

- [ ] `.env.local` file exists in `frontend/` directory
- [ ] `.env.local` is listed in `.gitignore`
- [ ] `.env.example` exists (for reference)

**Verify**:
```bash
cd frontend
ls -la .env*
```

You should see:
- `.env.example` ✅
- `.env.local` ✅
- `.env.template` ✅

### 2. Supabase Configuration

- [ ] Supabase project URL copied from dashboard
- [ ] Supabase anon key copied from dashboard
- [ ] `VITE_SUPABASE_URL` set in `.env.local`
- [ ] `VITE_SUPABASE_ANON_KEY` set in `.env.local`
- [ ] No extra spaces or line breaks in values
- [ ] Using `anon` key (not `service_role`)

**Verify**:
```bash
cat .env.local | grep VITE_SUPABASE
```

You should see:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Database Setup

- [ ] `supabase-setup.sql` executed in Supabase SQL Editor
- [ ] Tables created successfully
- [ ] RLS policies enabled
- [ ] No SQL errors in execution

**Verify**:
In Supabase Dashboard → Table Editor, you should see:
- `usuarios` table
- `cursos` table
- `modulos` table
- `temas` table
- `evaluaciones` table
- `notas` table
- `grupos` table
- `grupo_estudiantes` table
- `progreso_temas` table
- `entregas` table
- `materiales` table
- `semestres` table

### 4. Dependencies

- [ ] Dependencies installed (`npm install`)
- [ ] No installation errors
- [ ] `@supabase/supabase-js` package installed

**Verify**:
```bash
npm list @supabase/supabase-js
```

You should see the package version listed.

### 5. Application Configuration

- [ ] `VITE_API_BASE_URL` set (optional)
- [ ] `VITE_APP_NAME` set (optional)
- [ ] `VITE_APP_URL` set (optional)

## Testing Checklist

### 1. Start Development Server

- [ ] Development server starts without errors
- [ ] No environment variable errors in console

**Test**:
```bash
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 2. Browser Console Check

- [ ] Open browser to `http://localhost:5173`
- [ ] Open browser console (F12)
- [ ] No Supabase connection errors
- [ ] No "Missing required environment variable" errors

**Expected**: Clean console with no errors related to environment variables or Supabase.

### 3. Network Tab Check

- [ ] Open browser Network tab
- [ ] Look for requests to Supabase
- [ ] Verify requests are going to your Supabase URL
- [ ] No 401 or 403 errors

### 4. Application Functionality

- [ ] Login page loads
- [ ] Application name displays correctly
- [ ] No error messages on screen

## Common Issues Checklist

If you encounter issues, check these:

### Environment Variables Not Loading

- [ ] Variables start with `VITE_` prefix
- [ ] Development server restarted after changes
- [ ] `.env.local` is in `frontend/` directory (not root)
- [ ] No syntax errors in `.env.local`
- [ ] No quotes around values (not needed)

### Supabase Connection Errors

- [ ] Supabase project is active (not paused)
- [ ] URL is correct (starts with `https://`)
- [ ] Anon key is complete (very long string)
- [ ] Using `anon` key (not `service_role`)
- [ ] No extra spaces in URL or key

### Database Errors

- [ ] SQL schema executed successfully
- [ ] Tables exist in Supabase
- [ ] RLS policies are enabled
- [ ] No SQL syntax errors

### Build Errors

- [ ] All dependencies installed
- [ ] Node version is 18+
- [ ] No TypeScript errors
- [ ] Import paths are correct

## Verification Commands

Run these commands to verify your setup:

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Check if .env.local exists
ls -la frontend/.env.local

# Check environment variables (should show your values)
cat frontend/.env.local

# Install dependencies
cd frontend && npm install

# Start dev server (should start without errors)
npm run dev
```

## Success Criteria

Your environment is properly configured when:

✅ Development server starts without errors  
✅ Browser console shows no environment variable errors  
✅ Application loads at `http://localhost:5173`  
✅ Login page displays with correct app name  
✅ No Supabase connection errors  
✅ Network requests go to your Supabase URL  

## Next Steps

Once all checklist items are complete:

1. ✅ Review [README.md](README.md) for development workflow
2. ✅ Check [ENV_VARIABLES.md](ENV_VARIABLES.md) for detailed variable documentation
3. ✅ Read [SETUP.md](SETUP.md) for troubleshooting tips
4. ✅ Start developing! 🚀

## Need Help?

If you're stuck:

1. Review the error message carefully
2. Check the [SETUP.md](SETUP.md) troubleshooting section
3. Verify each checklist item above
4. Check browser console for specific errors
5. Verify Supabase project status in dashboard

## Documentation References

- [README.md](README.md) - General setup and development
- [SETUP.md](SETUP.md) - Detailed setup guide
- [ENV_VARIABLES.md](ENV_VARIABLES.md) - Environment variables documentation
- [Vite Env Docs](https://vitejs.dev/guide/env-and-mode.html)
- [Supabase Docs](https://supabase.com/docs)

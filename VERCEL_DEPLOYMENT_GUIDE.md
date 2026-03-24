# Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

- [x] TypeScript errors fixed
- [x] Dependencies installed
- [x] Code pushed to GitHub
- [ ] Vercel project configured
- [ ] Environment variables added
- [ ] Database initialized

## 🚀 Deployment Steps

### Step 1: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `vyolete/Eduapp`

### Step 2: Configure Build Settings

In the project configuration screen, set:

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` (default)

### Step 3: Add Environment Variables

Click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://mtlvcliwhspzbjkjntxp.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bHZjbGl3aHNwemJqa2pudHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjU1NDMsImV4cCI6MjA4OTgwMTU0M30.wdbOHrcELpp2JTjWKe-y6G6sYVYj9bqizD1lxMezKhM` |

Make sure to select "All Environments" (Production, Preview, Development).

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll get a URL like: `https://eduapp-xyz.vercel.app`

### Step 5: Initialize Database

**IMPORTANT**: Before using the app, you must initialize the database:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/mtlvcliwhspzbjkjntxp)
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the contents of `supabase-setup.sql`
5. Click "Run" to execute the script

This script will:
- Update RLS policies to allow data operations
- Insert initial test data (courses, modules, assessments, users, etc.)

### Step 6: Test the Application

1. Visit your Vercel URL
2. Try logging in with test credentials (check the SQL script for user data)
3. Navigate through Dashboard, Courses, Modules, etc.
4. Verify data is loading from Supabase

## 🔧 Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Verify all environment variables are set correctly
- Ensure `frontend` is set as root directory

### App Loads But No Data
- Run the `supabase-setup.sql` script in Supabase Dashboard
- Check browser console for API errors
- Verify Supabase URL and anon key are correct

### Authentication Issues
- Ensure users exist in the database (created by SQL script)
- Check Supabase Auth settings
- Verify RLS policies are updated

## 📝 Post-Deployment

After successful deployment:
1. Share the Vercel URL with other teachers
2. Provide them with test credentials
3. Monitor Vercel analytics for usage
4. Check Supabase dashboard for database activity

## 🔄 Future Updates

To deploy updates:
1. Make changes locally
2. Commit and push to GitHub: `git push origin main`
3. Vercel will automatically redeploy

---

**Repository**: https://github.com/vyolete/Eduapp
**Supabase Project**: https://mtlvcliwhspzbjkjntxp.supabase.co

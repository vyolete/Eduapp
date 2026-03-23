# Environment Setup Guide

This guide walks you through setting up the environment variables for EduApp ITM.

## Step 1: Create a Supabase Project

If you don't have a Supabase project yet:

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in the project details:
   - **Name**: `eduapp-itm` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is sufficient for development
5. Click **"Create new project"**
6. Wait for the project to be provisioned (1-2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase project dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the `supabase-setup.sql` file from the project root
4. Copy the entire SQL content and paste it into the SQL editor
5. Click **"Run"** to execute the schema setup
6. Verify that tables were created by checking the **"Table Editor"** section

## Step 3: Get Your Supabase Credentials

1. In your Supabase project dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** in the settings menu
3. You'll see two important values:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **API Keys:**
   - `anon` `public` key (this is safe to use in the browser)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. Copy both values - you'll need them in the next step

## Step 4: Configure Environment Variables

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Open `.env.local` in your text editor

4. Replace the placeholder values with your actual Supabase credentials:

   **Before:**
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   **After:**
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. Save the file

## Step 5: Verify Configuration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`

3. Open the browser console (F12 or Cmd+Option+I)

4. Check for any Supabase connection errors

5. If everything is configured correctly, you should see no errors related to Supabase

## Common Issues

### Issue: "Invalid API key" error

**Solution:** 
- Double-check that you copied the entire anon key (it's very long!)
- Make sure there are no extra spaces or line breaks
- Verify you're using the `anon` key, not the `service_role` key

### Issue: "Failed to fetch" or CORS errors

**Solution:**
- Verify your Supabase project URL is correct
- Check that your Supabase project is active (not paused)
- Ensure you're using `https://` in the URL

### Issue: Environment variables not loading

**Solution:**
- Ensure the file is named `.env.local` (not `.env.local.txt`)
- Verify all variables start with `VITE_` prefix
- Restart the dev server after changing environment variables
- Check that `.env.local` is in the `frontend/` directory

### Issue: "Table does not exist" errors

**Solution:**
- Make sure you ran the `supabase-setup.sql` script
- Check the SQL Editor for any errors during schema creation
- Verify tables exist in the Table Editor section

## Security Notes

- **Never commit `.env.local` to version control** - it's already in `.gitignore`
- The `anon` key is safe to use in the browser (it's public)
- The `service_role` key should NEVER be used in the frontend
- Row Level Security (RLS) policies protect your data even with the public key

## Next Steps

Once your environment is configured:

1. Review the [README.md](README.md) for development commands
2. Check the [architecture documentation](../.kiro/specs/architecture-documentation/) for implementation details
3. Start developing! 🚀

## Need Help?

If you're still having issues:

1. Check the browser console for specific error messages
2. Verify your Supabase project status in the dashboard
3. Review the Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
4. Check the project's architecture documentation for troubleshooting tips

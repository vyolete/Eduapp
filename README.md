# EduApp ITM

Educational platform for ITM (Institución Universitaria) supporting courses in Informática para la Gestión.

## Project Overview

This repository contains the EduApp ITM platform, a React-based educational application with Supabase backend integration. The platform supports three user roles (admin, teacher, student) with different access levels and navigation flows.

## Repository Structure

```
.
├── frontend/              # React application (To-Be architecture)
├── eduplatform (1).tsx    # Original monolithic component (As-Is)
├── macros-module.tsx      # Interactive Macros module
├── vba-lesson.tsx         # VBA tutorial component
├── supabase-setup.sql     # Database schema and setup
└── .kiro/specs/           # Architecture documentation
```

## Quick Start

### Frontend Application (Recommended)

The new modular frontend is located in the `frontend/` directory:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Configure your Supabase credentials in `.env.local`:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

4. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

See [frontend/README.md](frontend/README.md) for detailed setup instructions.

### Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-setup.sql` in your Supabase SQL editor
3. Configure Row Level Security (RLS) policies as needed

## Architecture

This project is transitioning from a monolithic architecture (As-Is) to a modular architecture (To-Be):

- **As-Is**: Single-file React components with hardcoded data
- **To-Be**: Modular React app with Supabase integration, proper state management, and API layer

For detailed architecture documentation, see:
- [Requirements Document](.kiro/specs/architecture-documentation/requirements.md)
- [Design Document](.kiro/specs/architecture-documentation/design.md)
- [Implementation Tasks](.kiro/specs/architecture-documentation/tasks.md)

## Technology Stack

- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **State Management**: Zustand
- **Testing**: Vitest, React Testing Library

## User Roles

| Role | Access Level | Features |
|------|-------------|----------|
| **Admin** | Full system access | Dashboard, Courses, Modules, Groups, Users, Reports |
| **Teacher** | Course management | Dashboard, Modules, Assessments, Groups |
| **Student** | Learning content | My Course, Modules, Assessments, Grades |

## Development Status

Current implementation phase: **Phase 2 - Foundation Setup**

- [x] Project structure created
- [x] Dependencies installed
- [x] Environment variables configured
- [ ] Git branches for feature development
- [ ] Authentication layer
- [ ] API client layer

See [tasks.md](.kiro/specs/architecture-documentation/tasks.md) for the complete implementation plan.

## Contributing

This is an educational project for ITM. For questions or contributions, please refer to the architecture documentation in `.kiro/specs/architecture-documentation/`.

## License

Educational use for ITM (Institución Universitaria).

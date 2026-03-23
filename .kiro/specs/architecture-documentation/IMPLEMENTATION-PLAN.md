# Implementation Plan - EduApp ITM To-Be Architecture

## Overview

This document outlines the gradual implementation plan for migrating from As-Is to To-Be architecture.
Each phase is designed to be testable and deployable independently.

---

## Phase 0: Foundation Setup

### Goal
Set up the project structure and dependencies for the To-Be implementation.

### Tasks
1. Create project structure for To-Be
2. Install required dependencies (Supabase, Axios, TypeScript types)
3. Configure environment variables
4. Set up Git branches for feature development

### Dependencies to Install
- `@supabase/supabase-js` - Supabase client
- `axios` - HTTP client for API
- `zod` - Schema validation
- `zustand` - State management
- `@types/react-router-dom` - Routing types
- `react-router-dom` - Client-side routing

### Success Criteria
- Project structure created
- All dependencies installed
- Environment variables configured
- Git branches set up

### Test Plan
```bash
npm install
npm run dev
# Verify no compilation errors
```

---

## Phase 1: Authentication Layer

### Goal
Implement Supabase Auth integration with proper login/logout functionality.

### Tasks
1. Create Supabase client configuration
2. Implement AuthContext for global auth state
3. Create login component with Supabase Auth
4. Create protected route wrapper
5. Implement session persistence

### Files to Create
- `src/lib/supabase/client.ts` - Supabase client instance
- `src/contexts/AuthContext.tsx` - Auth context provider
- `src/components/auth/Login.tsx` - Login form
- `src/components/auth/ProtectedRoute.tsx` - Route guard

### Success Criteria
- User can login with email/password
- Session persists across page reloads
- Protected routes require authentication
- Logout clears session

### Test Plan
1. Navigate to `/login`
2. Enter valid credentials (admin@itm.edu.co / admin123)
3. Verify redirect to `/dashboard`
4. Refresh page - verify still logged in
5. Click logout - verify redirect to `/login`

---

## Phase 2: API Client Layer

### Goal
Create API client with proper error handling and request/response interceptors.

### Tasks
1. Create API client with Axios
2. Implement request/response interceptors
3. Add error handling utilities
4. Create type-safe API functions

### Files to Create
- `src/lib/api/client.ts` - API client instance
- `src/lib/api/auth.ts` - Auth API functions
- `src/lib/api/courses.ts` - Course API functions
- `src/lib/api/modules.ts` - Module API functions
- `src/lib/api/assessments.ts` - Assessment API functions
- `src/lib/api/grades.ts` - Grade API functions
- `src/lib/api/groups.ts` - Group API functions

### Success Criteria
- API calls can be made to all endpoints
- Errors are properly handled and displayed
- Requests include authentication token
- Responses are properly typed

### Test Plan
1. Test login API call
2. Test courses list API call
3. Test error handling for invalid requests
4. Verify auth token is included in requests

---

## Phase 3: Database Models & Types

### Goal
Create TypeScript interfaces for all data models.

### Tasks
1. Create User model interface
2. Create Course model interface
3. Create Module model interface
4. Create Class model interface
5. Create Assessment model interface
6. Create Grade model interface
7. Create Group model interface

### Files to Create
- `src/lib/types/user.ts`
- `src/lib/types/course.ts`
- `src/lib/types/module.ts`
- `src/lib/types/class.ts`
- `src/lib/types/assessment.ts`
- `src/lib/types/grade.ts`
- `src/lib/types/group.ts`

### Success Criteria
- All models have proper TypeScript interfaces
- Relations between models are defined
- All fields match Supabase schema

### Test Plan
1. Verify no TypeScript compilation errors
2. Test model instantiation
3. Test model serialization

---

## Phase 4: State Management (Zustand)

### Goal
Implement Zustand stores for managing application state.

### Tasks
1. Create auth store
2. Create courses store
3. Create modules store
4. Create assessments store
5. Create grades store

### Files to Create
- `src/store/useAuthStore.ts`
- `src/store/useCourseStore.ts`
- `src/store/useModuleStore.ts`
- `src/store/useAssessmentStore.ts`
- `src/store/useGradeStore.ts`

### Success Criteria
- State is properly managed
- Actions update state correctly
- Selectors work as expected

### Test Plan
1. Test store initialization
2. Test state updates
3. Test selectors
4. Test persistence

---

## Phase 5: UI Components

### Goal
Create reusable UI components for the application.

### Tasks
1. Create Button component
2. Create Card component
3. Create Input component
4. Create Modal component
5. Create Table component
6. Create Loading component
7. Create Error component

### Files to Create
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/Table.tsx`
- `src/components/ui/Loading.tsx`
- `src/components/ui/Error.tsx`

### Success Criteria
- Components are reusable
- Components have proper TypeScript types
- Components follow design system

### Test Plan
1. Test each component renders correctly
2. Test component props
3. Test component interactions

---

## Phase 6: Layout Components

### Goal
Create layout components (Header, Sidebar, Footer).

### Tasks
1. Create Header component
2. Create Sidebar component
3. Create Footer component
4. Create Layout wrapper

### Files to Create
- `src/components/layout/Header.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Layout.tsx`

### Success Criteria
- Layout is responsive
- Navigation works correctly
- Role-based menu items display correctly

### Test Plan
1. Test layout on different screen sizes
2. Test navigation between pages
3. Test role-based menu items

---

## Phase 7: Page Components

### Goal
Create page components for each route.

### Tasks
1. Create Dashboard page
2. Create Courses page
3. Create Modules page
4. Create Assessments page
5. Create Grades page
6. Create Groups page

### Files to Create
- `src/pages/Dashboard.tsx`
- `src/pages/Courses.tsx`
- `src/pages/Modules.tsx`
- `src/pages/Assessments.tsx`
- `src/pages/Grades.tsx`
- `src/pages/Groups.tsx`

### Success Criteria
- Each page displays data correctly
- CRUD operations work
- Loading states display properly

### Test Plan
1. Test each page loads data
2. Test CRUD operations on each page
3. Test error handling

---

## Phase 8: Routing

### Goal
Implement client-side routing.

### Tasks
1. Install React Router
2. Create route configuration
3. Update App.tsx with routing
4. Create navigation links

### Files to Create/Modify
- `src/App.tsx` - Add routing
- `src/routes.ts` - Route configuration

### Success Criteria
- Navigation works correctly
- URL changes with navigation
- Page components load correctly

### Test Plan
1. Test navigation between pages
2. Test URL changes
3. Test page reloads

---

## Phase 9: Testing

### Goal
Implement unit and integration tests.

### Tasks
1. Install testing libraries
2. Create unit tests for components
3. Create integration tests for key flows
4. Create E2E tests for critical paths

### Files to Create
- `src/components/__tests__/Button.test.tsx`
- `src/components/__tests__/Card.test.tsx`
- `src/pages/__tests__/Dashboard.test.tsx`
- `src/__e2e__/login.spec.ts`

### Success Criteria
- Tests pass
- Code coverage > 80%

### Test Plan
```bash
npm test
npm run test:coverage
```

---

## Implementation Order

```
Phase 0 (Foundation)
    ↓
Phase 1 (Authentication) ← CRITICAL
    ↓
Phase 2 (API Client) ← CRITICAL
    ↓
Phase 3 (Models & Types)
    ↓
Phase 4 (State Management)
    ↓
Phase 5 (UI Components)
    ↓
Phase 6 (Layout Components)
    ↓
Phase 7 (Page Components)
    ↓
Phase 8 (Routing)
    ↓
Phase 9 (Testing)
```

---

## Critical Path (Must Have First)

1. **Phase 1: Authentication** - Without auth, no secure access
2. **Phase 2: API Client** - Without API, no data from database
3. **Phase 3: Models & Types** - Without types, no type safety
4. **Phase 4: State Management** - Without state management, app becomes unmaintainable

---

## Testing Strategy

### Per-Phase Testing
Each phase must pass its test plan before moving to the next phase.

### Manual Testing Checklist
- [ ] Login works
- [ ] Data loads from database
- [ ] CRUD operations work
- [ ] Error handling works
- [ ] Loading states display
- [ ] Navigation works

### Automated Testing
- Unit tests for each component
- Integration tests for key flows
- E2E tests for critical paths

---

## Rollback Strategy

If any phase fails:
1. Revert the changes
2. Fix the issue
3. Re-run tests
4. Continue to next phase

No phase should block the application from running.

# EduApp ITM Architecture Design Document

## Overview

This document describes the target architecture (To-Be) for the EduApp ITM educational platform. The platform currently exists as a React application with hardcoded data and no persistence layer. The target architecture introduces a complete backend integration with Supabase, a proper API layer, and a well-structured frontend architecture.

### Current State (As-Is)

- React app with hardcoded data in `INITIAL_DATA`
- No API layer, no persistence
- Supabase schema exists but not integrated
- Three user roles: admin, teacher, student

### Target State (To-Be)

- Complete API layer with REST endpoints
- Supabase PostgreSQL integration
- Proper authentication with JWT tokens
- Well-structured frontend with separation of concerns
- Real-time updates via Supabase Realtime
- Comprehensive error handling and validation

---

## Architecture

### Frontend Architecture

```
frontend/
├── components/
│   ├── layout/       # Header, Sidebar, Footer
│   ├── ui/           # Reusable buttons, cards, inputs
│   ├── modules/      # Module-specific components
│   └── interactive/  # Drag-drop, simulations
├── pages/            # Route pages (Dashboard, Courses, etc.)
├── hooks/            # Custom hooks (useAuth, useData)
├── lib/
│   ├── api/          # API client (axios/fetch)
│   ├── types/        # TypeScript interfaces
│   └── utils/        # Helpers
├── contexts/         # React Context (Auth, Theme)
└── App.tsx           # Main app with routing
```

### Backend Architecture

```
backend/
├── src/
│   ├── controllers/  # HTTP handlers
│   ├── services/     # Business logic
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── middleware/   # Auth, validation
└── database/
    ├── migrations/   # SQL migrations
    └── seeders/      # Initial data
```

### Data Flow (To-Be)

```
User → React Component → API Client → Backend → Database
     ↓                                              ↑
  UI Updates                                   Data Persistence
```

---

## Components and Interfaces

### Frontend Component Mapping

| Current Component | Future Location | Purpose |
|-------------------|-----------------|---------|
| `eduplatform (1).tsx` | `src/pages/Dashboard.tsx`, `src/pages/Courses.tsx`, etc. | Split into route-specific pages |
| `macros-module.tsx` | `src/pages/Modules/Macros.tsx` | Interactive module page |
| `vba-lesson.tsx` | `src/pages/Learn/VBA.tsx` | Step-by-step tutorial page |

### API Client Interface

```typescript
// lib/api/client.ts
export interface APIClient {
  get<T>(path: string, config?: RequestConfig): Promise<APIResponse<T>>
  post<T>(path: string, body?: any, config?: RequestConfig): Promise<APIResponse<T>>
  put<T>(path: string, body?: any, config?: RequestConfig): Promise<APIResponse<T>>
  delete<T>(path: string, config?: RequestConfig): Promise<APIResponse<T>>
}

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
```

### Authentication Context

```typescript
// contexts/AuthContext.tsx
export interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (email: string, password: string, role: UserRole) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
  created_at: string
}

export type UserRole = 'admin' | 'teacher' | 'student'
```

### State Management Strategy

**Library**: Zustand (lightweight, minimal boilerplate)

```typescript
// store/useCourseStore.ts
interface CourseState {
  courses: Course[]
  activeCourse: Course | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchCourses: () => Promise<void>
  fetchCourseById: (id: string) => Promise<void>
  createCourse: (course: Course) => Promise<void>
  updateCourse: (id: string, course: Partial<Course>) => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  setActiveCourse: (course: Course | null) => void
}
```

---

## Data Models

### User Model

```typescript
// lib/types/user.ts
export interface User {
  id: string              // UUID from Supabase
  email: string
  role: UserRole
  name: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type UserRole = 'admin' | 'teacher' | 'student'
```

### Course Model

```typescript
// lib/types/course.ts
export interface Course {
  id: string              // UUID
  name: string
  program: string
  credits: number
  teacher_id: string      // Foreign key to users
  competence: string
  description?: string
  status: 'active' | 'inactive' | 'draft'
  created_at: string
  updated_at: string
  
  // Relations
  modules?: Module[]
  assessments?: Assessment[]
  groups?: Group[]
}
```

### Module Model

```typescript
// lib/types/module.ts
export interface Module {
  id: string              // UUID
  course_id: string       // Foreign key
  name: string
  color: string           // Hex color for UI
  notebook_url?: string   // Google Colab URL
  topics: string[]        // List of topic names
  order: number           // Display order
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  
  // Relations
  classes?: Class[]
  materials?: Material[]
}
```

### Class Model

```typescript
// lib/types/class.ts
export interface Class {
  id: string              // UUID
  module_id: string       // Foreign key
  title: string
  type: ClassType
  content: string         // HTML content for text, URL for video/slides
  description?: string
  notebook_url?: string
  order: number
  duration_minutes?: number
  created_at: string
  updated_at: string
}

export type ClassType = 'text' | 'video' | 'slides' | 'pdf' | 'link'
```

### Assessment Model

```typescript
// lib/types/assessment.ts
export interface Assessment {
  id: string              // UUID
  course_id: string       // Foreign key
  name: string
  pct: number             // Weight percentage (0-100)
  week: number            // Week number
  module: string          // Module name (or "Todos" for course projects)
  due_date?: string
  max_score: number
  description?: string
  created_at: string
  updated_at: string
  
  // Relations
  grades?: Grade[]
}
```

### Group Model

```typescript
// lib/types/group.ts
export interface Group {
  id: string              // UUID
  course_id: string       // Foreign key
  name: string
  description?: string
  max_students?: number
  active: boolean
  created_at: string
  updated_at: string
  
  // Relations
  students?: User[]
  modules?: Module[]
}
```

### Grade Model

```typescript
// lib/types/grade.ts
export interface Grade {
  id: string              // UUID
  assessment_id: string   // Foreign key
  student_id: string      // Foreign key
  score: number           // 0-100
  feedback?: string
  submitted_at?: string
  graded_at?: string
  grader_id?: string      // Teacher who graded
  created_at: string
  updated_at: string
}
```

### Progress Model

```typescript
// lib/types/progress.ts
export interface TopicProgress {
  id: string              // UUID
  user_id: string         // Foreign key
  topic_id: string        // Foreign key to temas table
  completed: boolean
  completed_at?: string
  score?: number          // 0-25 for each topic
  notes?: string
  created_at: string
  updated_at: string
}
```

---

## API Design

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/password-reset` | Request password reset | No |
| POST | `/api/auth/password-reset/confirm` | Confirm password reset | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Course Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | List all courses | Yes |
| GET | `/api/courses/:id` | Get course details | Yes |
| POST | `/api/courses` | Create new course | Yes (admin/teacher) |
| PUT | `/api/courses/:id` | Update course | Yes (admin/teacher) |
| DELETE | `/api/courses/:id` | Delete course | Yes (admin) |

### Module Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/modules` | List modules (filtered by course) | Yes |
| GET | `/api/modules/:id` | Get module details | Yes |
| POST | `/api/modules` | Create new module | Yes (admin/teacher) |
| PUT | `/api/modules/:id` | Update module | Yes (admin/teacher) |
| DELETE | `/api/modules/:id` | Delete module | Yes (admin) |

### Class Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/classes` | List classes (filtered by module) | Yes |
| GET | `/api/classes/:id` | Get class details | Yes |
| POST | `/api/classes` | Create new class | Yes (admin/teacher) |
| PUT | `/api/classes/:id` | Update class | Yes (admin/teacher) |
| DELETE | `/api/classes/:id` | Delete class | Yes (admin) |

### Assessment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/assessments` | List assessments (filtered by course) | Yes |
| GET | `/api/assessments/:id` | Get assessment details | Yes |
| POST | `/api/assessments` | Create new assessment | Yes (admin/teacher) |
| PUT | `/api/assessments/:id` | Update assessment | Yes (admin/teacher) |
| DELETE | `/api/assessments/:id` | Delete assessment | Yes (admin) |

### Grade Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/grades` | List grades (filtered by student/assessment) | Yes |
| POST | `/api/grades` | Submit/grade assessment | Yes |
| PUT | `/api/grades/:id` | Update grade | Yes (teacher/admin) |

### Group Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/groups` | List groups (filtered by course) | Yes |
| GET | `/api/groups/:id` | Get group details | Yes |
| POST | `/api/groups` | Create new group | Yes (admin/teacher) |
| PUT | `/api/groups/:id` | Update group | Yes (admin/teacher) |
| DELETE | `/api/groups/:id` | Delete group | Yes (admin) |

### Error Response Format

```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": {
      "field": "email"
    }
  }
}
```

---

## Database Integration

### Supabase Integration Plan

**Tables to Use:**
- `auth.users` → Authentication (managed by Supabase Auth)
- `usuarios` → User profiles (linked to auth.users)
- `cursos` → Courses
- `modulos` → Modules
- `temas` → Classes/Content
- `evaluaciones` → Assessments
- `notas` → Grades
- `progreso_temas` → Student progress
- `grupos` → Groups
- `grupo_estudiantes` → Group-student relationships
- `entregas` → Assignment submissions
- `materiales` → Course materials

### Database Schema Relationships

```
auth.users (1) ──── (1) usuarios
usuarios (1) ──── (N) grupo_estudiantes (N) ──── (1) grupos
grupos (1) ──── (1) cursos
grupos (N) ──── (N) modulos (via moduleIds in groups)
modulos (1) ──── (N) temas
usuarios (N) ──── (N) progreso_temas
cursos (1) ──── (N) evaluaciones
evaluaciones (1) ──── (N) notas
usuarios (N) ──── (N) entregas
temas (1) ──── (N) materiales
```

### RLS Policies

Row Level Security is configured for all tables with policies for:
- Users viewing their own profile
- Admin/teacher viewing all data
- Students viewing their own progress and grades
- Public read access to semesters, courses, modules, assessments

### Migration Strategy

**Phase 1: Database Setup**
1. Create all tables with proper relationships
2. Set up RLS policies
3. Create indexes for frequently queried fields
4. Set up database seeders for initial data

**Phase 2: API Development**
1. Create REST endpoints for each entity
2. Implement authentication middleware
3. Add input validation
4. Implement error handling

**Phase 3: Frontend Integration**
1. Replace hardcoded data with API calls
2. Add loading states
3. Implement error handling
4. Add optimistic updates

---

## Migration Strategy

### Phase 1: API Foundation

**Timeline**: 2-3 weeks

**Tasks**:
- Create all REST endpoints
- Implement authentication with Supabase Auth
- Set up database models and migrations
- Implement input validation
- Add comprehensive error handling
- Write unit and integration tests

**Deliverables**:
- Complete REST API with documentation
- Authentication flow working
- Database schema ready for production

### Phase 2: Frontend Integration

**Timeline**: 3-4 weeks

**Tasks**:
- Replace hardcoded data with API calls
- Add loading states and skeleton screens
- Implement error handling and user feedback
- Add optimistic updates for better UX
- Implement real-time updates with Supabase Realtime
- Write E2E tests for user flows

**Deliverables**:
- Fully functional frontend with backend integration
- Real-time updates working
- Error handling in place

### Phase 3: Enhancements

**Timeline**: 2-3 weeks

**Tasks**:
- Implement advanced filtering and search
- Add export functionality (PDF, Excel)
- Implement analytics and reporting
- Add notifications system
- Optimize performance (lazy loading, code splitting)
- Add accessibility improvements

**Deliverables**:
- Enhanced user experience
- Performance optimizations
- Analytics dashboard

---

## Technology Decisions

### Frontend Stack

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| React 18+ | UI framework | Mature ecosystem, strong typing with TypeScript |
| TypeScript | Type safety | Catch errors at compile time, better IDE support |
| React Router | Navigation | Standard routing solution for React |
| Axios | HTTP client | Promise-based, interceptors for auth |
| Zustand | State management | Lightweight, minimal boilerplate |
| Tailwind CSS | Styling | Utility-first, rapid development |
| React Hook Form | Form handling | Performance, validation |
| Zod | Schema validation | Type-safe validation schemas |

### Backend Stack

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| Node.js 18+ | Runtime | JavaScript runtime, large ecosystem |
| Express.js | Web framework | Minimal, flexible, widely used |
| Supabase PostgreSQL | Database | Managed PostgreSQL, RLS built-in |
| JWT | Authentication | Standard for token-based auth |
| CORS | Cross-origin | Required for frontend-backend communication |
| Zod | Validation | Type-safe validation |

### Infrastructure

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| Docker | Containerization | Consistent environments, easy deployment |
| Vercel | Frontend hosting | Optimized for React, edge network |
| Supabase | Backend hosting | Managed database, auth, storage |
| GitHub Actions | CI/CD | Integrated with GitHub, flexible workflows |

---

## File Structure Mapping

### Current → Future

| Current File | Future Location | Notes |
|--------------|-----------------|-------|
| `eduplatform (1).tsx` | `src/pages/Dashboard.tsx`, `src/pages/Courses.tsx`, `src/pages/Modules.tsx`, `src/pages/Groups.tsx`, `src/pages/Users.tsx`, `src/pages/Reports.tsx` | Split into route-specific pages |
| `macros-module.tsx` | `src/pages/Modules/Macros.tsx` | Interactive module page |
| `vba-lesson.tsx` | `src/pages/Learn/VBA.tsx` | Step-by-step tutorial page |
| `INITIAL_DATA` | `src/lib/api/` + database | API client + Supabase integration |

### New File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   ├── modules/
│   │   ├── CourseList.tsx
│   │   ├── ModuleList.tsx
│   │   └── AssessmentList.tsx
│   └── interactive/
│       ├── DragDrop.tsx
│       └── CodeEditor.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Courses.tsx
│   ├── Courses/
│   │   ├── CourseDetail.tsx
│   │   └── CourseForm.tsx
│   ├── Modules.tsx
│   ├── Modules/
│   │   ├── ModuleDetail.tsx
│   │   ├── ModuleForm.tsx
│   │   └── Macros.tsx
│   ├── Groups.tsx
│   ├── Groups/
│   │   ├── GroupDetail.tsx
│   │   └── GroupForm.tsx
│   ├── Users.tsx
│   ├── Users/
│   │   ├── UserForm.tsx
│   │   └── Profile.tsx
│   ├── Assessments.tsx
│   ├── Assessments/
│   │   ├── AssessmentDetail.tsx
│   │   └── AssessmentForm.tsx
│   ├── Grades.tsx
│   ├── Reports.tsx
│   └── Learn/
│       ├── VBA.tsx
│       └── Topic.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useData.ts
│   ├── useApi.ts
│   └── useRealtime.ts
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── courses.ts
│   │   ├── modules.ts
│   │   ├── assessments.ts
│   │   └── grades.ts
│   ├── types/
│   │   ├── user.ts
│   │   ├── course.ts
│   │   ├── module.ts
│   │   ├── assessment.ts
│   │   └── grade.ts
│   └── utils/
│       ├── validators.ts
│       ├── formatters.ts
│       └── constants.ts
├── contexts/
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── ToastContext.tsx
├── store/
│   ├── useCourseStore.ts
│   ├── useModuleStore.ts
│   └── useAuthStore.ts
└── App.tsx
```

---

## Non-Functional Requirements

### Performance

| Metric | Target | Implementation |
|--------|--------|----------------|
| Page load time | < 2s | Code splitting, lazy loading |
| API response time | < 500ms | Database indexing, caching |
| Time to interactive | < 3s | Optimized bundle, lazy loading |
| Real-time latency | < 100ms | Supabase Realtime |

### Scalability

| Requirement | Implementation |
|-------------|----------------|
| Support 1000+ concurrent users | Supabase auto-scaling, database indexing |
| Database performance | Add indexes on frequently queried fields |
| Caching | Redis for session data, browser caching for static assets |
| CDN | Vercel edge network for frontend assets |

### Maintainability

| Requirement | Implementation |
|-------------|----------------|
| TypeScript strict mode | Enable `strict: true` in tsconfig |
| Component documentation | JSDoc comments, Storybook for UI components |
| Code splitting | Dynamic imports for route components |
| Error boundaries | React error boundaries for component errors |
| Logging | Centralized logging with context |

### Security

| Requirement | Implementation |
|-------------|----------------|
| HTTPS only | Enforce HTTPS in production |
| RLS policies active | All tables have RLS enabled |
| Input validation | Zod schemas for all inputs |
| XSS protection | React's built-in escaping, sanitize user input |
| CSRF protection | Supabase handles this, additional tokens for state-changing operations |
| Password security | Supabase Auth handles hashing, minimum 8 characters |
| API rate limiting | Express middleware for rate limiting |

---

## Testing Strategy

### Unit Tests

**Coverage Areas**:
- Component rendering
- API client functions
- Utility functions
- Form validation
- State management actions

**Tools**:
- Jest for test runner
- React Testing Library for component testing
- Vitest for faster test execution

### Integration Tests

**Coverage Areas**:
- User flows (login, navigation, CRUD operations)
- Data persistence
- Authentication flow
- API endpoint behavior
- Database queries

**Tools**:
- Supabase test utilities
- Mock API server for backend testing

### E2E Tests

**Coverage Areas**:
- Full user journeys (admin, teacher, student)
- Admin workflows (user management, course creation)
- Student workflows (learning, assessments)
- Real-time updates
- Error scenarios

**Tools**:
- Playwright or Cypress
- Test against staging environment

### Property-Based Testing

**Coverage Areas**:
- Data validation rules
- State transitions
- API contract verification

**Tools**:
- fast-check for JavaScript/TypeScript
- Property definitions in design document

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Authentication round trip

*For any* valid user credentials, after successful login, the user should be authenticated and subsequent API requests should include a valid JWT token.

**Validates: Requirements from Authentication section**

### Property 2: Role-based access control

*For any* user, the system should only allow access to resources and operations permitted by their role (admin, teacher, student).

**Validates: Requirements from User Roles section**

### Property 3: Data persistence round trip

*For any* entity (course, module, assessment), after creation, the entity should be retrievable from the database with the same data.

**Validates: Requirements from Data Persistence section**

### Property 4: Real-time synchronization

*For any* data update, all connected clients should receive the updated data within 100ms via Supabase Realtime.

**Validates: Requirements from Real-time Updates section**

### Property 5: Input validation

*For any* user input, the system should reject invalid data and return appropriate error messages.

**Validates: Requirements from Input Validation section**

### Property 6: Error handling

*For any* API request, the system should return a consistent error response format with appropriate HTTP status codes.

**Validates: Requirements from Error Handling section**

---

## Error Handling

### Error Categories

1. **Authentication Errors** (401, 403)
   - Invalid credentials
   - Expired token
   - Insufficient permissions

2. **Validation Errors** (400)
   - Invalid input format
   - Missing required fields
   - Invalid data values

3. **Not Found Errors** (404)
   - Resource doesn't exist
   - Invalid ID

4. **Server Errors** (500, 503)
   - Database connection failures
   - External service failures
   - Rate limiting

### Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {
      "field": "optional-field-specific-details"
    }
  }
}
```

### Frontend Error Handling

- Display user-friendly error messages
- Log errors with context for debugging
- Implement retry logic for transient failures
- Show loading states during async operations
- Handle network errors gracefully

---

## Testing Strategy

### Dual Testing Approach

**Unit Tests**:
- Verify specific examples, edge cases, and error conditions
- Test individual components and functions in isolation
- Focus on UI rendering and user interactions

**Property Tests**:
- Verify universal properties across all inputs
- Test data validation rules
- Test state transitions and API contracts

### Property-Based Testing Configuration

- Minimum 100 iterations per property test
- Each property test references its design document property
- Tag format: **Feature: architecture-documentation, Property {number}: {property_text}**

### Test Coverage Targets

- Unit tests: 80%+ code coverage
- Integration tests: Cover all user flows
- E2E tests: Cover critical user journeys

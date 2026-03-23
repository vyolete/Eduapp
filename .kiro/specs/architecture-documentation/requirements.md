# Requirements Document

## Introduction

This document describes the current architecture (As-Is) of the EduApp ITM educational platform. The platform is a React-based application with Supabase backend integration. All data is currently hardcoded in React components with no persistence layer - data resets on page reload. The system supports three user roles: admin, teacher, and student, each with different access levels and navigation flows.

## Glossary

- **EduApp ITM**: Educational platform for ITM (Institución Universitaria) supporting courses in Informática para la Gestión
- **Platform**: The React application serving as the main interface for students, teachers, and administrators
- **Supabase**: Backend-as-a-Service used for database operations and authentication
- **INIT_DATA**: Hardcoded JavaScript object containing all application data (users, courses, modules, assessments, groups, grades)
- **MACRO_CLASSES**: Array of class objects specifically for the Macros and Security module
- **Bit**: Mascot character used throughout the application for user engagement and guidance
- **Module**: Course content unit containing topics, classes, and materials
- **Class**: Individual learning activity within a module (text, video, slides, etc.)
- **Assessment**: Graded evaluation within a course (tallers, projects)
- **Group**: Student grouping for course enrollment
- **RLS**: Row Level Security - Supabase security feature for data access control

## Current Architecture Overview

### Technology Stack

- **Frontend**: React (TypeScript/JSX)
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **Styling**: Inline styles (S object pattern)
- **State Management**: React useState hooks
- **No external state management library** (Redux, Context API minimal usage)

### Data Flow (As-Is)

```
User → React Component → useState → Hardcoded Data (INIT_DATA, MACRO_CLASSES)
     ↓
  No API calls
     ↓
  Data resets on page reload
```

**Key Characteristics:**
- No HTTP requests to backend for data fetching
- No API layer abstraction
- All data stored in component state
- No data persistence across sessions
- Supabase schema exists but is not integrated with frontend

## Data Structure

### INITIAL_DATA Object

The application uses a single `INITIAL_DATA` constant containing all application data:

```javascript
const INITIAL_DATA = {
  users: [
    { id: number, role: "admin"|"teacher"|"student", name: string, email: string, password: string }
  ],
  courses: [
    {
      id: number,
      name: string,
      program: string,
      credits: number,
      teacher: string,
      competence: string,
      modules: [Module],
      assessments: [Assessment]
    }
  ],
  groups: [
    { id: number, name: string, courseId: number, moduleIds: number[], studentIds: number[] }
  ],
  grades: { [userId: number]: { [assessmentId: number]: number } }
};
```

### Module Structure

```javascript
{
  id: number,
  name: string,
  color: string,           // Hex color for UI
  notebookUrl: string,     // Google Colab URL
  topics: string[],        // List of topic names
  classes: [Class],
  materials: [Material]
}
```

### Class Structure

```javascript
{
  id: string,              // Unique identifier (e.g., "hc1", "c1")
  title: string,
  type: "text"|"video"|"slides"|"pdf"|"link",
  content: string,         // HTML content for text, URL for video/slides
  description?: string,
  notebookUrl?: string
}
```

### Assessment Structure

```javascript
{
  id: number,
  name: string,
  pct: number,             // Weight percentage (0-100)
  week: number,            // Week number
  module: string           // Module name (or "Todos" for course projects)
}
```

### User Roles

| Role | Access Level | Navigation Menu |
|------|-------------|-----------------|
| **admin** | Full system access | Dashboard, Courses, Modules, Groups, Users, Reports |
| **teacher** | Course content management | Dashboard, Modules, Assessments, Groups |
| **student** | Read-only learning content | My Course, Modules, Assessments, Grades |

## Component Structure

### Main Application Component

**File**: `eduplatform (1).tsx`

**Component Name**: `App` (default export)

**State Variables**:
- `data`: Holds INITIAL_DATA object
- `session`: `{ userId: number, role: string }` or null
- `loginForm`: `{ email: string, password: string, error: string }`
- `view`: Current view name (string)
- `sideOpen`: Sidebar collapse state (boolean)
- `modal`: Active modal type (string) or null
- `form`: Form data object
- `editId`: ID of item being edited (number or null)
- `activeCourseId`: Currently selected course ID
- `activeModuleId`: Currently selected module ID
- `activeClassId`: Currently selected class ID

**Key Functions**:

| Function | Purpose |
|----------|---------|
| `doLogin()` | Authenticates user against hardcoded credentials |
| `logout()` | Clears session and resets view |
| `saveUser()` | Adds or updates user in data |
| `deleteUser(id)` | Removes user from data |
| `saveGroup()` | Adds or updates group with student/module associations |
| `deleteGroup(id)` | Removes group from data |
| `saveModule()` | Adds or updates module for active course |
| `deleteModule(id)` | Removes module from course |
| `saveClass()` | Adds or updates class within active module |
| `deleteClass(id)` | Removes class from module |
| `saveCourse()` | Adds or updates course |
| `deleteCourse(id)` | Removes course |
| `calcAvg(uid)` | Calculates weighted average grade for student |
| `validateStudentEmail(email)` | Validates @correo.itm.edu.co format |
| `renderContent(cls, mod)` | Renders class content based on type (video, slides, text) |

**Navigation Configurations**:

```javascript
navAdmin = [
  {id:"dashboard",label:"Dashboard",icon:"◈"},
  {id:"courses",label:"Cursos",icon:"📘"},
  {id:"modules",label:"Módulos",icon:"⊞"},
  {id:"groups",label:"Grupos",icon:"◎"},
  {id:"users",label:"Usuarios",icon:"⊙"},
  {id:"reports",label:"Reportes",icon:"▦"},
];

navTeacher = [
  {id:"dashboard",label:"Dashboard",icon:"◈"},
  {id:"modules",label:"Módulos",icon:"⊞"},
  {id:"assessments",label:"Evaluaciones",icon:"✓"},
  {id:"groups",label:"Grupos",icon:"◎"},
];

navStudent = [
  {id:"micurso",label:"Mi Curso",icon:"◈"},
  {id:"modulos",label:"Módulos",icon:"⊞"},
  {id:"evaluaciones",label:"Evaluaciones",icon:"✓"},
  {id:"misnotas",label:"Mis Notas",icon:"◎"},
];
```

### Macros Module Component

**File**: `macros-module.tsx`

**Component Name**: `App` (default export)

**Purpose**: Interactive learning module for VBA Macros and Security

**State Variables**:
- `screen`: "login" or "admin" or "topics"
- `loginInput`: User email input
- `user`: Current user object
- `semesters`: Array of semester objects with students
- `activeSem`: Active semester ID
- `grades`: Student grades by module
- `topicProgress`: Student progress by topic
- `activeTopic`: Currently active topic (0-3)
- `topicStep`: Step within topic

**Key Features**:
- Student registration via email paste
- Topic progress tracking (4 topics × 25 points = 100 max)
- Interactive exercises for data types, structures, macro recorder, VBA editor
- Grade management and export functionality
- Certificate generation upon topic completion

### VBA Lesson Component

**File**: `vba-lesson.tsx`

**Component Name**: `App` (default export)

**Purpose**: Step-by-step VBA tutorial with drag-and-drop coding exercises

**State Variables**:
- `step`: Current tutorial step (0-4)
- `dragBlocks`: Available code blocks
- `dropZone`: User-arranged code blocks
- `invoiceData`: Form data for invoice simulator
- `progress`: Array of 5 boolean values for step completion

**Key Features**:
- Drag-and-drop code block ordering
- Invoice data entry simulator
- Step-by-step VBA learning path
- Progress tracking and Bit mascot feedback

## Navigation Flow

### Login Flow

```
1. User enters email and password
2. doLogin() validates against INITIAL_DATA.users
3. If valid: setSession({ userId, role }), setView(role-specific default)
4. If invalid: show error message
```

**Pre-configured Test Accounts**:
- Admin: `admin@itm.edu.co` / `admin123`
- Teacher: `j.salazar@itm.edu.co` / `profe123`
- Student: `carlos.perez@correo.itm.edu.co` / `est123`

### Dashboard Flow (Admin)

```
Dashboard → [Select Action]
  ├─ Courses → View/Edit Courses
  ├─ Modules → Select Course → View Modules → Select Module → View Classes
  ├─ Groups → View/Edit Groups (assign modules/students)
  ├─ Users → View/Edit Users (by role)
  └─ Reports → View student performance metrics
```

### Dashboard Flow (Teacher)

```
Dashboard → [Select Action]
  ├─ Modules → Select Module → View Classes
  ├─ Assessments → View/Edit Assessments
  └─ Groups → View Groups
```

### Dashboard Flow (Student)

```
My Course → View Course Info
  ├─ Modules → Select Module → View Classes
  ├─ Assessments → View Grades
  └─ My Grades → View Grade Summary
```

## Supabase Schema Integration

### Current State

The Supabase schema exists but is **NOT integrated** with the frontend application. The schema was created for future implementation but the current version uses only hardcoded data.

### Schema Tables

| Table | Purpose | Status |
|-------|---------|--------|
| `semestres` | Semester management | Created, not used |
| `usuarios` | User accounts with roles | Created, not used |
| `cursos` | Course definitions | Created, not used |
| `grupos` | Student groups | Created, not used |
| `grupo_estudiantes` | Group-student relationships | Created, not used |
| `modulos` | Module definitions | Created, not used |
| `temas` | Topic/content items | Created, not used |
| `progreso_temas` | Student topic progress | Created, not used |
| `evaluaciones` | Assessments | Created, not used |
| `notas` | Student grades | Created, not used |
| `entregas` | Assignment submissions | Created, not used |
| `materiales` | Course materials | Created, not used |

### RLS Policies

Row Level Security is configured for all tables with policies for:
- Users viewing their own profile
- Admin/teacher viewing all data
- Students viewing their own progress and grades
- Public read access to semesters, courses, modules, assessments

### Schema Relationships

```
semestres (1) ──── (N) usuarios
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

## Data Persistence

### Current Implementation

**NO PERSISTENCE** - All data is stored in React component state:

```javascript
const [data, setData] = useState(INITIAL_DATA);
```

**Behavior**:
- Data loads once on component mount
- Changes persist only during session
- Page refresh resets all data to INITIAL_DATA
- No localStorage, sessionStorage, or database integration

### Data Modification Operations

All CRUD operations modify the in-memory data object:

```javascript
function saveUser() {
  const u = {...data};  // Shallow copy
  if (editId) {
    const i = u.users.findIndex(x => x.id === editId);
    u.users[i] = {...u.users[i], ...form};
  } else {
    u.users.push({id: Date.now(), ...form});
  }
  setData(u);  // Trigger re-render
}
```

**Issues**:
- No undo/redo capability
- No data validation beyond email format
- No conflict resolution
- No audit trail

## UI Styling

### Style Object Pattern

All components use inline styles defined in `S` or `P` objects:

```javascript
const S = {
  wrap: { display: "flex", height: "100vh", background: "#0f0f13", ... },
  side: (open) => ({ width: open ? 210 : 54, ... }),
  card: { background: "#1e1d28", border: "1px solid #2a2840", ... },
  btn: (v="def") => ({ padding: "7px 14px", ... }),
};
```

**Color Palette**:
- Primary: `#7F77DD` (purple)
- Success: `#1D9E75` (green)
- Warning: `#BA7517` (amber)
- Danger: `#D85A30` (orange/red)
- Background: `#0f0f13` (dark)
- Card: `#1e1d28` (slightly lighter)

## Authentication

### Current Implementation

**Hardcoded Credentials** - No real authentication:

```javascript
function doLogin() {
  const u = data.users.find(x => x.email === loginForm.email && x.password === loginForm.password);
  if (!u) { setLoginForm({...loginForm, error: "Correo o contraseña incorrectos"}); return; }
  setSession({ userId: u.id, role: u.role });
  // ...
}
```

**Characteristics**:
- No JWT tokens
- No session refresh
- No password hashing
- No password reset flow
- No multi-factor authentication

## Data Models Summary

### User Model

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| role | string | "admin", "teacher", or "student" |
| name | string | Full name |
| email | string | Institutional email |
| password | string | Plain text password |

### Course Model

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | Course name |
| program | string | Academic program |
| credits | number | Credit hours |
| teacher | string | Teacher name |
| competence | string | Learning outcome |
| modules | Module[] | Course modules |
| assessments | Assessment[] | Course evaluations |

### Module Model

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | Module name |
| color | string | UI color code |
| notebookUrl | string | Google Colab URL |
| topics | string[] | Topic names |
| classes | Class[] | Learning activities |
| materials | Material[] | Resource files |

### Assessment Model

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | Assessment name |
| pct | number | Weight percentage |
| week | number | Week number |
| module | string | Associated module |

### Group Model

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| name | string | Group name |
| courseId | number | Associated course |
| moduleIds | number[] | Available module IDs |
| studentIds | number[] | Enrolled student IDs |

## Known Limitations (As-Is)

1. **No Data Persistence**: All changes lost on page reload
2. **No Real Authentication**: Hardcoded credentials only
3. **No API Layer**: Direct state manipulation only
4. **No Error Handling**: No try/catch for data operations
5. **No Validation**: Minimal input validation
6. **No Concurrency**: No handling for simultaneous edits
7. **No Audit Trail**: No logging of changes
8. **No Backup/Restore**: No data export/import
9. **No Search**: No filtering or search functionality
10. **No Responsive Design**: Fixed layout without mobile optimization

## Supabase Integration Status

**NOT IMPLEMENTED** - The Supabase schema and RLS policies are created but the frontend does not use Supabase client for any operations.

**Expected Integration Points**:
- `supabase.auth.signInWithPassword()` for login
- `supabase.from('users').select()` for user data
- `supabase.from('cursos').select()` for courses
- `supabase.from('modulos').select()` for modules
- `supabase.from('notas').upsert()` for grades

## Current State Summary

The EduApp ITM platform is a **fully functional prototype** with:

- ✅ Complete UI for all user roles
- ✅ Navigation and routing (view-based)
- ✅ CRUD operations for all entities
- ✅ Assessment grading system
- ✅ Student progress tracking
- ✅ Interactive learning modules (VBA)
- ❌ No data persistence
- ❌ No real authentication
- ❌ No Supabase integration
- ❌ No API layer
- ❌ No error handling
- ❌ No testing

The application demonstrates the complete user experience and data model but requires backend integration for production use.

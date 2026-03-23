# EduApp ITM - As-Is Prototype Structure

## Project Structure

```
prototype-as-is/
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
├── STRUCTURE.md           # This file - structure documentation
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── src/                   # Source code
    ├── App.tsx            # Main application component (922 lines)
    ├── main.tsx           # React entry point
    └── vite-env.d.ts      # Vite type definitions
```

## File Descriptions

### Root Files

| File | Purpose |
|------|---------|
| `package.json` | NPM configuration with React 18 and Vite 5 |
| `vite.config.js` | Vite build configuration (port 3000) |
| `index.html` | HTML template with React root div |
| `.gitignore` | Excludes node_modules, dist, .DS_Store |

### Source Files

| File | Lines | Purpose |
|------|-------|---------|
| `App.tsx` | 922 | Main React component with all UI and logic |
| `main.tsx` | 7 | React DOM render entry point |
| `vite-env.d.ts` | 1 | Vite client type definitions |

## Application Architecture (As-Is)

### Technology Stack

- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Language**: TypeScript/JSX
- **Styling**: Inline styles (S object pattern)
- **State Management**: React useState hooks

### Component Structure

**Single File Architecture** - All functionality in `App.tsx`:

```
App (eduplatform (1).tsx)
├── BitOwl (SVG mascot component)
├── MACRO_CLASSES (Data array)
├── INITIAL_DATA (Hardcoded data object)
│   ├── users (6 users)
│   ├── courses (1 course with 4 modules)
│   ├── groups (2 groups)
│   └── grades (Student grades)
├── S (Style object)
├── State variables (11 useState hooks)
├── CRUD functions (10 functions)
├── Navigation configs (3 role-based navs)
└── Content renderer (renderContent function)
```

### State Management

```typescript
const [data, setData] = useState(INITIAL_DATA);
const [session, setSession] = useState(null);
const [loginForm, setLoginForm] = useState({ email:"", password:"", error:"" });
const [view, setView] = useState("dashboard");
const [sideOpen, setSideOpen] = useState(true);
const [modal, setModal] = useState(null);
const [form, setForm] = useState({});
const [editId, setEditId] = useState(null);
const [activeCourseId, setActiveCourseId] = useState(1);
const [activeModuleId, setActiveModuleId] = useState(null);
const [activeClassId, setActiveClassId] = useState(null);
```

### Data Models

**User**
```typescript
{ id: number, role: "admin"|"teacher"|"student", name: string, email: string, password: string }
```

**Course**
```typescript
{ 
  id: number, 
  name: string, 
  program: string, 
  credits: number, 
  teacher: string, 
  competence: string,
  modules: Module[],
  assessments: Assessment[]
}
```

**Module**
```typescript
{ 
  id: number, 
  name: string, 
  color: string, 
  notebookUrl: string,
  topics: string[],
  classes: Class[],
  materials: Material[]
}
```

**Class**
```typescript
{ 
  id: string, 
  title: string, 
  type: "text"|"video"|"slides"|"pdf"|"link",
  content: string, 
  description?: string, 
  notebookUrl?: string 
}
```

**Assessment**
```typescript
{ 
  id: number, 
  name: string, 
  pct: number, 
  week: number, 
  module: string 
}
```

### User Roles

| Role | Navigation Menu |
|------|-----------------|
| **admin** | Dashboard, Courses, Modules, Groups, Users, Reports |
| **teacher** | Dashboard, Modules, Assessments, Groups |
| **student** | My Course, Modules, Assessments, Grades |

### Key Functions

| Function | Purpose |
|----------|---------|
| `doLogin()` | Authenticate user against hardcoded credentials |
| `logout()` | Clear session and reset view |
| `saveUser()` | Add or update user |
| `deleteUser(id)` | Remove user |
| `saveGroup()` | Add or update group |
| `deleteGroup(id)` | Remove group |
| `saveModule()` | Add or update module |
| `deleteModule(id)` | Remove module |
| `saveClass()` | Add or update class |
| `deleteClass(id)` | Remove class |
| `saveCourse()` | Add or update course |
| `deleteCourse(id)` | Remove course |
| `calcAvg(uid)` | Calculate weighted average grade |
| `validateStudentEmail(email)` | Validate @correo.itm.edu.co format |
| `renderContent(cls, mod)` | Render class content by type |

### Navigation Flow

```
Login → Dashboard (role-specific)
  ├─ Admin: Courses → Modules → Classes
  ├─ Teacher: Modules → Classes
  └─ Student: My Course → Modules → Classes
```

### Styling Pattern

All styles defined in `S` object with inline styles:

```typescript
const S = {
  wrap: { display:"flex", height:"100vh", ... },
  side: (open) => ({ width: open?210:54, ... }),
  card: { background:"#1e1d28", ... },
  btn: (v="def") => ({ padding:"7px 14px", ... }),
  // ... more styles
};
```

### Color Palette

- Primary: `#7F77DD` (purple)
- Success: `#1D9E75` (green)
- Warning: `#BA7517` (amber)
- Danger: `#D85A30` (orange/red)
- Background: `#0f0f13` (dark)
- Card: `#1e1d28` (slightly lighter)

## Data Flow (As-Is)

```
User Input → Event Handler → useState Update → Re-render
     ↓
  No API calls
     ↓
  No database
     ↓
  Data resets on page reload
```

## Known Limitations

1. **No Persistence** - All data in memory only
2. **No Authentication** - Hardcoded credentials
3. **No API Layer** - Direct state manipulation
4. **No Error Handling** - No try/catch blocks
5. **No Validation** - Minimal input validation
6. **No Testing** - No test files
7. **Single File** - All logic in one component

## Running the Application

```bash
cd prototype-as-is
npm install
npm run dev
```

The application runs at `http://localhost:3000`

## Test Accounts

- **Admin**: `admin@itm.edu.co` / `admin123`
- **Teacher**: `j.salazar@itm.edu.co` / `profe123`
- **Student**: `carlos.perez@correo.itm.edu.co` / `est123`

## Comparison with To-Be Architecture

| Aspect | As-Is | To-Be |
|--------|-------|-------|
| Data Storage | Hardcoded in component | PostgreSQL via Supabase |
| Authentication | Hardcoded credentials | Supabase Auth with JWT |
| API Layer | None | REST API endpoints |
| State Management | useState hooks | Zustand + Context |
| File Structure | Single file | Modular (components, pages, hooks) |
| Persistence | No | Yes |
| Testing | No | Jest + React Testing Library |

## Next Steps

See `design.md` in parent directory for To-Be architecture details.

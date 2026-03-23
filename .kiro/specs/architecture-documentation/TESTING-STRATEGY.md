# Testing Strategy - EduApp ITM To-Be Architecture

## Overview

This document outlines the testing strategy for each phase of the To-Be implementation.

---

## Phase 0: Foundation Setup

### Test Plan
```bash
# Test 1: Dependencies installed
npm list
# Expected: All dependencies listed

# Test 2: No compilation errors
npm run build
# Expected: No errors

# Test 3: Dev server starts
npm run dev
# Expected: Server starts on port 3000
```

### Success Criteria
- All dependencies installed
- No compilation errors
- Dev server starts successfully

---

## Phase 1: Authentication Layer

### Test Plan

#### Test 1: Login with valid credentials
```bash
1. Navigate to /login
2. Enter: admin@itm.edu.co / admin123
3. Click login
# Expected: Redirect to /dashboard
# Expected: Session stored in Supabase
```

#### Test 2: Login with invalid credentials
```bash
1. Navigate to /login
2. Enter: invalid@test.com / wrongpassword
3. Click login
# Expected: Error message displayed
# Expected: No redirect
```

#### Test 3: Session persistence
```bash
1. Login successfully
2. Refresh page
# Expected: Still logged in
# Expected: User data preserved
```

#### Test 4: Logout
```bash
1. Login successfully
2. Click logout button
# Expected: Redirect to /login
# Expected: Session cleared
```

#### Test 5: Protected route access
```bash
1. Navigate to /dashboard without login
# Expected: Redirect to /login
```

### Success Criteria
- Login works with valid credentials
- Login fails with invalid credentials
- Session persists across page reloads
- Logout clears session
- Protected routes require authentication

---

## Phase 2: API Client Layer

### Test Plan

#### Test 1: API client initialization
```typescript
import { api } from '@/lib/api/client';

// Test: Client is initialized
expect(api).toBeDefined();
```

#### Test 2: Auth token in requests
```typescript
// Test: Auth token is included in requests
const response = await api.get('/auth/me');
expect(response.headers.authorization).toBeDefined();
```

#### Test 3: Error handling
```typescript
// Test: Invalid request returns error
try {
  await api.get('/invalid-endpoint');
} catch (error) {
  expect(error.response.status).toBe(404);
}
```

#### Test 4: Courses API
```typescript
// Test: Get courses list
const response = await api.get('/courses');
expect(response.data).toBeArray();
expect(response.data.length).toBeGreaterThan(0);
```

#### Test 5: Module API
```typescript
// Test: Get modules for course
const response = await api.get('/courses/1/modules');
expect(response.data).toBeArray();
```

### Success Criteria
- API client initialized correctly
- Auth token included in requests
- Errors handled properly
- All API endpoints work

---

## Phase 3: Database Models & Types

### Test Plan

#### Test 1: User model
```typescript
import { User } from '@/lib/types/user';

const user: User = {
  id: 'uuid',
  email: 'test@test.com',
  role: 'admin',
  name: 'Test User',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

expect(user.id).toBeDefined();
expect(user.email).toBeDefined();
```

#### Test 2: Course model
```typescript
import { Course } from '@/lib/types/course';

const course: Course = {
  id: 'uuid',
  name: 'Test Course',
  program: 'Test Program',
  credits: 3,
  teacher_id: 'uuid',
  competence: 'Test Competence',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

expect(course.name).toBe('Test Course');
```

#### Test 3: Module model
```typescript
import { Module } from '@/lib/types/module';

const module: Module = {
  id: 'uuid',
  course_id: 'uuid',
  name: 'Test Module',
  color: '#7F77DD',
  topics: ['Topic 1', 'Topic 2'],
  order: 1,
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

expect(module.name).toBe('Test Module');
```

#### Test 4: Class model
```typescript
import { Class } from '@/lib/types/class';

const classItem: Class = {
  id: 'uuid',
  module_id: 'uuid',
  title: 'Test Class',
  type: 'text',
  content: '<p>Test content</p>',
  order: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

expect(classItem.title).toBe('Test Class');
```

#### Test 5: Assessment model
```typescript
import { Assessment } from '@/lib/types/assessment';

const assessment: Assessment = {
  id: 'uuid',
  course_id: 'uuid',
  name: 'Test Assessment',
  pct: 20,
  week: 5,
  module: 'Test Module',
  max_score: 100,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

expect(assessment.name).toBe('Test Assessment');
```

### Success Criteria
- All models have proper TypeScript interfaces
- All fields match Supabase schema
- No compilation errors

---

## Phase 4: State Management (Zustand)

### Test Plan

#### Test 1: Auth store
```typescript
import { useAuthStore } from '@/store/useAuthStore';

// Test: Initialize store
const { user, login, logout } = useAuthStore();

// Test: Login
login({ id: '1', email: 'test@test.com', role: 'admin', name: 'Test' });
expect(useAuthStore.getState().user?.email).toBe('test@test.com');

// Test: Logout
logout();
expect(useAuthStore.getState().user).toBeNull();
```

#### Test 2: Course store
```typescript
import { useCourseStore } from '@/store/useCourseStore';

// Test: Fetch courses
await useCourseStore.getState().fetchCourses();
expect(useCourseStore.getState().courses.length).toBeGreaterThan(0);

// Test: Create course
await useCourseStore.getState().createCourse({ name: 'Test Course' });
expect(useCourseStore.getState().courses.length).toBe(2);
```

#### Test 3: Module store
```typescript
import { useModuleStore } from '@/store/useModuleStore';

// Test: Fetch modules
await useModuleStore.getState().fetchModules(1);
expect(useModuleStore.getState().modules.length).toBeGreaterThan(0);
```

### Success Criteria
- Stores initialize correctly
- State updates work
- Selectors return correct data

---

## Phase 5: UI Components

### Test Plan

#### Test 1: Button component
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Test 2: Card component
```typescript
import { render, screen } from '@testing-library/react';
import Card from '@/components/ui/Card';

test('renders card with children', () => {
  render(<Card><p>Test content</p></Card>);
  expect(screen.getByText('Test content')).toBeInTheDocument();
});
```

#### Test 3: Input component
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/ui/Input';

test('renders input with placeholder', () => {
  render(<Input placeholder="Enter text" />);
  expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
});

test('calls onChange when typed', () => {
  const handleChange = jest.fn();
  render(<Input onChange={handleChange} />);
  fireEvent.change(screen.getByPlaceholderText('Enter text'), { target: { value: 'test' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
```

### Success Criteria
- All components render correctly
- Props work as expected
- Events fire correctly

---

## Phase 6: Layout Components

### Test Plan

#### Test 1: Header component
```typescript
import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header';

test('renders header with user name', () => {
  render(<Header user={{ name: 'Test User' }} />);
  expect(screen.getByText('Test User')).toBeInTheDocument();
});
```

#### Test 2: Sidebar component
```typescript
import { render, screen } from '@testing-library/react';
import Sidebar from '@/components/layout/Sidebar';

test('renders navigation items', () => {
  render(<Sidebar navItems={[{ id: 'dashboard', label: 'Dashboard' }]} />);
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});
```

### Success Criteria
- Layout renders correctly
- Navigation items display
- Responsive design works

---

## Phase 7: Page Components

### Test Plan

#### Test 1: Dashboard page
```typescript
import { render, screen } from '@testing-library/react';
import Dashboard from '@/pages/Dashboard';

test('renders dashboard with user info', () => {
  render(<Dashboard user={{ name: 'Test User' }} />);
  expect(screen.getByText('Test User')).toBeInTheDocument();
});
```

#### Test 2: Courses page
```typescript
import { render, screen } from '@testing-library/react';
import Courses from '@/pages/Courses';

test('renders courses list', () => {
  render(<Courses courses={[{ name: 'Test Course' }]} />);
  expect(screen.getByText('Test Course')).toBeInTheDocument();
});
```

#### Test 3: Modules page
```typescript
import { render, screen } from '@testing-library/react';
import Modules from '@/pages/Modules';

test('renders modules list', () => {
  render(<Modules modules={[{ name: 'Test Module' }]} />);
  expect(screen.getByText('Test Module')).toBeInTheDocument();
});
```

### Success Criteria
- Pages render data correctly
- CRUD operations work
- Loading states display

---

## Phase 8: Routing

### Test Plan

#### Test 1: Navigation
```typescript
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

test('navigates to dashboard', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});
```

#### Test 2: Route protection
```typescript
test('redirects to login when not authenticated', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <App />
    </MemoryRouter>
  );
  expect(window.location.pathname).toBe('/login');
});
```

### Success Criteria
- Navigation works correctly
- URL changes with navigation
- Protected routes redirect to login

---

## Phase 9: Testing

### Test Plan

#### Unit Tests
```bash
npm test
# Expected: All unit tests pass
```

#### Integration Tests
```bash
npm run test:integration
# Expected: All integration tests pass
```

#### E2E Tests
```bash
npm run test:e2e
# Expected: All E2E tests pass
```

#### Coverage
```bash
npm run test:coverage
# Expected: Coverage > 80%
```

### Success Criteria
- All tests pass
- Code coverage > 80%
- No failing tests

---

## Manual Testing Checklist

### Phase 1: Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Session persists across page reloads
- [ ] Logout clears session
- [ ] Protected routes require authentication

### Phase 2: API Client
- [ ] API calls work correctly
- [ ] Auth token included in requests
- [ ] Errors handled properly
- [ ] All API endpoints work

### Phase 3: Models & Types
- [ ] No TypeScript compilation errors
- [ ] Models instantiated correctly
- [ ] Models serialized correctly

### Phase 4: State Management
- [ ] Stores initialize correctly
- [ ] State updates work
- [ ] Selectors return correct data

### Phase 5: UI Components
- [ ] Components render correctly
- [ ] Props work as expected
- [ ] Events fire correctly

### Phase 6: Layout Components
- [ ] Layout renders correctly
- [ ] Navigation items display
- [ ] Responsive design works

### Phase 7: Page Components
- [ ] Pages render data correctly
- [ ] CRUD operations work
- [ ] Loading states display

### Phase 8: Routing
- [ ] Navigation works correctly
- [ ] URL changes with navigation
- [ ] Page components load correctly

### Phase 9: Testing
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Code coverage > 80%

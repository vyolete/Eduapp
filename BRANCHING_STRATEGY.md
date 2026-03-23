# Git Branching Strategy for EduApp ITM

## Overview

This document outlines the Git branching strategy for the EduApp ITM project. The strategy follows a feature-branch workflow aligned with the three-phase migration plan outlined in the design document.

## Branch Structure

### Main Branches

#### `main`
- **Purpose**: Production-ready code
- **Protection**: Protected branch, requires pull request reviews
- **Merges from**: `develop` branch only
- **Deployment**: Automatically deploys to production

#### `develop`
- **Purpose**: Integration branch for ongoing development
- **Protection**: Protected branch, requires pull request reviews
- **Merges from**: Feature branches
- **Merges to**: `main` branch
- **Deployment**: Automatically deploys to staging environment

### Feature Branches

Feature branches are created for each phase of the migration strategy:

#### `feature/phase1-api-foundation`
**Timeline**: 2-3 weeks

**Scope**:
- REST API endpoints for all entities
- Supabase Auth integration
- Database models and migrations
- Input validation
- Error handling
- Unit and integration tests

**Tasks**:
- Authentication endpoints
- Course, Module, Class, Assessment, Grade, Group endpoints
- Database schema setup
- RLS policies configuration
- API documentation

**Merge to**: `develop` when Phase 1 is complete

---

#### `feature/phase2-frontend-integration`
**Timeline**: 3-4 weeks

**Scope**:
- Replace hardcoded data with API calls
- Loading states and skeleton screens
- Error handling and user feedback
- Optimistic updates
- Real-time updates with Supabase Realtime
- E2E tests for user flows

**Tasks**:
- API client integration
- State management with Zustand
- Component updates for data fetching
- Real-time subscriptions
- User feedback mechanisms

**Merge to**: `develop` when Phase 2 is complete

---

#### `feature/phase3-enhancements`
**Timeline**: 2-3 weeks

**Scope**:
- Advanced filtering and search
- Export functionality (PDF, Excel)
- Analytics and reporting
- Notifications system
- Performance optimizations
- Accessibility improvements

**Tasks**:
- Search and filter components
- Export utilities
- Analytics dashboard
- Notification system
- Code splitting and lazy loading
- Accessibility audit and fixes

**Merge to**: `develop` when Phase 3 is complete

---

## Workflow

### 1. Starting New Work

```bash
# Update your local develop branch
git checkout develop
git pull origin develop

# Create a new feature branch from develop
git checkout -b feature/your-feature-name
```

### 2. Working on a Feature

```bash
# Make changes and commit regularly
git add .
git commit -m "feat: descriptive commit message"

# Push to remote
git push origin feature/your-feature-name
```

### 3. Keeping Your Branch Updated

```bash
# Regularly sync with develop
git checkout develop
git pull origin develop
git checkout feature/your-feature-name
git merge develop
```

### 4. Completing a Feature

```bash
# Ensure all tests pass
npm test

# Push final changes
git push origin feature/your-feature-name

# Create a pull request to develop
# Request code review
# Address feedback
# Merge when approved
```

### 5. Releasing to Production

```bash
# After all features in develop are tested
git checkout main
git merge develop
git push origin main

# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build config, etc.)

### Examples

```bash
feat(auth): implement Supabase authentication

- Add login component
- Configure Supabase client
- Create AuthContext for global state

Closes #123
```

```bash
fix(api): handle network errors in API client

- Add retry logic for failed requests
- Display user-friendly error messages
- Log errors with context

Fixes #456
```

---

## Branch Protection Rules

### `main` Branch

- Require pull request reviews (minimum 1 approval)
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Restrict who can push to the branch
- Require linear history (no merge commits)

### `develop` Branch

- Require pull request reviews (minimum 1 approval)
- Require status checks to pass before merging
- Allow merge commits

---

## Phase-Specific Guidelines

### Phase 1: API Foundation

**Branch**: `feature/phase1-api-foundation`

**Key Considerations**:
- All API endpoints must have comprehensive tests
- Database migrations must be reversible
- API documentation must be updated with each endpoint
- Error handling must be consistent across all endpoints

**Merge Criteria**:
- All unit tests passing
- All integration tests passing
- API documentation complete
- Code review approved
- No breaking changes to existing functionality

---

### Phase 2: Frontend Integration

**Branch**: `feature/phase2-frontend-integration`

**Key Considerations**:
- Maintain backward compatibility during transition
- Implement feature flags for gradual rollout
- Add loading states for all async operations
- Handle all error scenarios gracefully

**Merge Criteria**:
- All E2E tests passing
- No console errors or warnings
- Loading states implemented
- Error handling complete
- Code review approved

---

### Phase 3: Enhancements

**Branch**: `feature/phase3-enhancements`

**Key Considerations**:
- Performance metrics must show improvement
- Accessibility audit must pass
- New features must have tests
- Documentation must be updated

**Merge Criteria**:
- Performance benchmarks met
- Accessibility standards met (WCAG 2.1 AA)
- All tests passing
- Documentation complete
- Code review approved

---

## Hotfix Workflow

For critical production bugs:

```bash
# Create hotfix branch from main
git checkout main
git checkout -b hotfix/critical-bug-fix

# Make the fix
git add .
git commit -m "fix: critical bug description"

# Merge to main
git checkout main
git merge hotfix/critical-bug-fix
git push origin main

# Also merge to develop
git checkout develop
git merge hotfix/critical-bug-fix
git push origin develop

# Delete hotfix branch
git branch -d hotfix/critical-bug-fix
```

---

## Best Practices

1. **Keep branches short-lived**: Merge feature branches within 1-2 weeks
2. **Commit often**: Small, focused commits are easier to review and revert
3. **Write descriptive commit messages**: Explain the "why" not just the "what"
4. **Test before pushing**: Run tests locally before pushing to remote
5. **Review your own code**: Review your changes before requesting review from others
6. **Keep branches updated**: Regularly merge develop into your feature branch
7. **Delete merged branches**: Clean up branches after they're merged
8. **Use draft PRs**: Create draft pull requests for work in progress

---

## Tools and Automation

### Pre-commit Hooks

Install pre-commit hooks to enforce code quality:

```bash
npm install --save-dev husky lint-staged

# Add to package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### CI/CD Pipeline

GitHub Actions workflow for automated testing:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - run: npm run build
```

---

## Summary

This branching strategy ensures:

- **Clear separation of concerns**: Each phase has its own branch
- **Controlled integration**: Changes flow through develop before reaching main
- **Quality assurance**: Protected branches and required reviews
- **Traceability**: Conventional commits and linked issues
- **Flexibility**: Hotfix workflow for urgent fixes

Follow this strategy to maintain a clean, organized, and collaborative development workflow.

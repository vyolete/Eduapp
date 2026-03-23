# Git Quick Reference for EduApp ITM

## Branch Overview

```
main (production)
  └── develop (staging)
      ├── feature/phase1-api-foundation
      ├── feature/phase2-frontend-integration
      └── feature/phase3-enhancements
```

## Common Commands

### Check Current Branch
```bash
git branch
git status
```

### Switch Branches
```bash
# Switch to develop
git checkout develop

# Switch to Phase 1 branch
git checkout feature/phase1-api-foundation

# Switch to Phase 2 branch
git checkout feature/phase2-frontend-integration

# Switch to Phase 3 branch
git checkout feature/phase3-enhancements
```

### Update Your Branch
```bash
# Get latest changes from remote
git pull origin <branch-name>

# Example: Update develop branch
git checkout develop
git pull origin develop
```

### Create a New Feature Branch
```bash
# From develop
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature
```

### Commit Changes
```bash
# Stage all changes
git add .

# Or stage specific files
git add path/to/file.ts

# Commit with message
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-new-feature
```

### Merge Latest Changes from Develop
```bash
# While on your feature branch
git checkout develop
git pull origin develop
git checkout feature/my-feature
git merge develop
```

### View Commit History
```bash
# View all commits
git log

# View last 5 commits
git log -5

# View commits with file changes
git log --stat

# View one-line summary
git log --oneline
```

### Undo Changes
```bash
# Discard changes in working directory
git checkout -- path/to/file.ts

# Unstage a file
git reset HEAD path/to/file.ts

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

## Phase-Specific Workflows

### Working on Phase 1 (API Foundation)
```bash
# Switch to Phase 1 branch
git checkout feature/phase1-api-foundation

# Make your changes
# ... edit files ...

# Commit
git add .
git commit -m "feat(api): add authentication endpoints"

# Push
git push origin feature/phase1-api-foundation
```

### Working on Phase 2 (Frontend Integration)
```bash
# Switch to Phase 2 branch
git checkout feature/phase2-frontend-integration

# Make your changes
# ... edit files ...

# Commit
git add .
git commit -m "feat(frontend): integrate API client with components"

# Push
git push origin feature/phase2-frontend-integration
```

### Working on Phase 3 (Enhancements)
```bash
# Switch to Phase 3 branch
git checkout feature/phase3-enhancements

# Make your changes
# ... edit files ...

# Commit
git add .
git commit -m "feat(search): add advanced filtering"

# Push
git push origin feature/phase3-enhancements
```

## Commit Message Templates

### Feature
```bash
git commit -m "feat(scope): add new feature description"
```

### Bug Fix
```bash
git commit -m "fix(scope): fix bug description"
```

### Documentation
```bash
git commit -m "docs: update documentation"
```

### Refactoring
```bash
git commit -m "refactor(scope): refactor code description"
```

### Tests
```bash
git commit -m "test(scope): add tests for feature"
```

## Troubleshooting

### Merge Conflicts
```bash
# When you encounter a merge conflict:
# 1. Open the conflicted files
# 2. Look for conflict markers: <<<<<<<, =======, >>>>>>>
# 3. Resolve the conflicts manually
# 4. Stage the resolved files
git add path/to/resolved-file.ts

# 5. Complete the merge
git commit -m "merge: resolve conflicts from develop"
```

### Accidentally Committed to Wrong Branch
```bash
# If you committed to main instead of a feature branch:
# 1. Create a new branch from current state
git branch feature/my-feature

# 2. Reset main to previous state
git reset --hard HEAD~1

# 3. Switch to your feature branch
git checkout feature/my-feature
```

### Need to Stash Changes
```bash
# Save current changes without committing
git stash

# Switch branches
git checkout other-branch

# Come back and restore changes
git checkout original-branch
git stash pop
```

## Best Practices Checklist

- [ ] Pull latest changes before starting work
- [ ] Work on the correct feature branch
- [ ] Commit often with descriptive messages
- [ ] Test your changes before committing
- [ ] Push your changes regularly
- [ ] Keep your branch updated with develop
- [ ] Request code review before merging
- [ ] Delete branch after merging

## Getting Help

```bash
# Get help for any Git command
git help <command>

# Example
git help commit
git help merge
```

## Useful Aliases

Add these to your `~/.gitconfig`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --graph --oneline --all
```

Then use them like:
```bash
git st        # instead of git status
git co main   # instead of git checkout main
git br        # instead of git branch
```

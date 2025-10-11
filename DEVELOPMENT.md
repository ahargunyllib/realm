# Development Guide

Complete guide for developing in the Realm monorepo.

## 🏗️ Monorepo Architecture

The Realm monorepo follows modern best practices for scalable development:

```
realm/
├── apps/                 # User-facing applications
├── packages/             # Shared libraries and configurations
```

## 🚀 Getting Started

### System Requirements

- **Node.js**: v18.0.0 or higher
- **pnpm**: v9.0.0 or higher (recommended package manager)
- **Git**: Latest version

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/ahargunyllib/realm.git
cd realm

# Install dependencies for all workspaces
pnpm install

# Verify installation
pnpm --version
node --version
```

## 📦 Workspace Management

### Understanding Workspaces

The monorepo uses pnpm workspaces to manage multiple packages:

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Common Workspace Commands

```bash
# Install dependencies for all workspaces
pnpm install

# Install dependency in specific workspace
pnpm --filter site add dependency-name

# Run script in specific workspace
pnpm --filter site dev

# Run script in all workspaces
pnpm -r dev

# Run script in all workspaces that have it
pnpm --filter "*" build
```

## 🔧 Development Workflow

### Starting Development

```bash
# Start the site application
pnpm --filter site dev

# Or navigate to the app directory
cd apps/site
pnpm dev
```

### Adding New Applications

1. **Create Application Directory**

   ```bash
   mkdir apps/new-app
   cd apps/new-app
   ```

2. **Initialize Package**

   ```bash
   pnpm init
   ```

3. **Configure Package.json**

   ```json
   {
     "name": "new-app",
     "version": "0.0.1",
     "private": true,
     "type": "module",
     "scripts": {
       "dev": "your-dev-command",
       "build": "your-build-command"
     }
   }
   ```

4. **Add TypeScript Configuration**

   ```json
   {
     "extends": "@realm/tsconfig/base.json",
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     },
     "include": ["src/**/*"]
   }
   ```

5. **Install from Root**
   ```bash
   cd ../../
   pnpm install
   ```

### Adding New Packages

1. **Create Package Directory**

   ```bash
   mkdir packages/new-package
   cd packages/new-package
   ```

2. **Initialize with Scoped Name**

   ```json
   {
     "name": "@realm/new-package",
     "version": "0.0.0",
     "private": true,
     "type": "module",
     "main": "./dist/index.js",
     "types": "./dist/index.d.ts",
     "exports": {
       ".": {
         "types": "./dist/index.d.ts",
         "import": "./dist/index.js"
       }
     }
   }
   ```

3. **Configure Build Scripts**
   ```json
   {
     "scripts": {
       "build": "tsc",
       "dev": "tsc --watch"
     }
   }
   ```

## 🎨 Code Quality Standards

### Ultracite Configuration

The project uses Ultracite (Biome-based) for lightning-fast code quality

### Running Code Quality Checks

```bash
# Check all files
pnpm check

# Fix all auto-fixable issues
pnpm fix

# Check specific files
pnpm dlx ultracite@latest check src/**/*.ts

# Fix specific files
pnpm dlx ultracite@latest fix src/**/*.ts
```

### Git Hooks

The project uses Husky for git hooks:

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": [
      "pnpm dlx ultracite@latest fix"
    ]
  }
}
```

## 🧪 Testing Strategy

### Unit Testing

Each package should include unit tests:

```bash
# Add testing dependencies
pnpm --filter package-name add -D vitest @vitest/ui

# Run tests
pnpm --filter package-name test

# Run tests in watch mode
pnpm --filter package-name test:watch
```

### Integration Testing

For applications, add integration tests:

```bash
# Add Playwright for E2E testing
pnpm --filter site add -D @playwright/test

# Run E2E tests
pnpm --filter site test:e2e
```

## 🚢 Deployment Strategy

### Application Deployment

Each application has its own deployment strategy:

```bash
# Build application
pnpm --filter site build

# Preview production build
pnpm --filter site preview
```

### Package Publication

For packages intended for external use:

```bash
# Build package
pnpm --filter @realm/package-name build

# Publish to npm (if public)
pnpm --filter @realm/package-name publish
```

## 📊 Performance Monitoring

### Bundle Analysis

Monitor bundle sizes and performance:

```bash
# Analyze bundle (if configured)
pnpm --filter site analyze

# Build with stats
pnpm --filter site build --stats
```

### Development Performance

- Use `pnpm` for faster dependency installation
- Leverage TypeScript incremental compilation
- Utilize Vite's fast HMR for development

## 🔍 Debugging

### TypeScript Issues

```bash
# Check TypeScript in all workspaces
pnpm -r tsc --noEmit

# Check specific workspace
pnpm --filter site tsc --noEmit
```

### Dependency Issues

```bash
# Check dependency tree
pnpm list

# Check for duplicates
pnpm dedupe

# Verify workspace dependencies
pnpm --filter site list
```

### Build Issues

```bash
# Clean all builds
pnpm -r clean

# Rebuild all packages
pnpm -r build

# Force reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📋 Best Practices

### Code Organization

- **Single Responsibility**: Each package should have a clear purpose
- **Dependency Direction**: Apps depend on packages, not vice versa
- **Shared Utilities**: Common functionality goes in packages
- **Type Safety**: Use strict TypeScript configurations

### Git Workflow

```bash
# Create feature branch
git switch -c feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Performance Guidelines

- **Bundle Size**: Keep applications lightweight
- **Type Checking**: Use incremental TypeScript compilation
- **Dependencies**: Avoid duplicate dependencies across workspaces
- **Caching**: Leverage build caches and CDNs

## 🆘 Troubleshooting

### Common Issues

1. **TypeScript Errors After Adding Package**

   ```bash
   pnpm install
   pnpm -r build
   ```

2. **Workspace Not Found**

   ```bash
   # Check pnpm-workspace.yaml
   # Ensure package.json exists in workspace
   pnpm install
   ```

3. **Dependency Resolution Issues**
   ```bash
   rm -rf node_modules
   rm pnpm-lock.yaml
   pnpm install
   ```

### Getting Help

- Check package-specific README files
- Review TypeScript compiler errors
- Use VS Code's integrated terminal and problem panel
- Consult [pnpm documentation](https://pnpm.io/)

---

Happy coding! 🚀

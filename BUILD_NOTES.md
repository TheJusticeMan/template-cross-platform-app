# Build Notes

This document tracks important build configuration details and known issues for the template-cross-platform-app project.

## Build Targets

The project supports multiple build targets:

### 1. Web Build (`npm run build`)

- **Output**: `dist/` directory
- **Tool**: ESBuild
- **Features**:
  - Minified JavaScript (1KB)
  - External sourcemaps for debugging
  - CSS and HTML bundling
  - Documentation copied to `dist/docs/`
- **Status**: ✅ Working

### 2. Electron Build (`npm run electron:build`)

- **Output**: `electron-dist/` directory
- **Tool**: electron-builder
- **Packages Created**:
  - AppImage (Linux)
  - .deb package (Debian/Ubuntu)
- **Requirements**: Author information in package.json (now configured)
- **Status**: ✅ Working
- **Note**: GitHub token required for auto-publishing (optional)

### 3. Capacitor Build (`npm run cap:build`)

- **Output**: `android/` directory
- **Tool**: Capacitor CLI
- **Features**:
  - Android project generation
  - Web assets synced to Android
  - Native Android build support
- **Status**: ✅ Working

### 4. Documentation (`npm run docs:generate`)

- **Output**: `docs/generated/` directory
- **Tool**: TypeDoc with markdown plugin
- **Features**:
  - Auto-generated API docs from TsDoc
  - Markdown format for GitHub Pages
- **Status**: ✅ Working

## Dependency Notes

### Capacitor Version

**Current**: v6.2.0

**Reason**: Capacitor v8 requires Node.js >= 22.0.0, but the project currently uses Node 20.20.0.

**Migration Path**: When upgrading to Node 22+, update Capacitor dependencies:

```json
{
  "@capacitor/android": "^8.0.2",
  "@capacitor/cli": "^8.0.2",
  "@capacitor/core": "^8.0.2"
}
```

### Known Security Advisory

**Package**: tar (via @capacitor/cli)
**Severity**: High
**Status**: Not actionable without Capacitor 8 upgrade
**Impact**: Dev dependency only, not in production bundle
**Mitigation**: Limited to development environment; upgrade Node and Capacitor when possible

## Configuration Updates Made

### 1. package.json

- Added author information (required for Electron .deb packages):
  ```json
  "author": {
    "name": "Template Author",
    "email": "template@example.com",
    "url": "https://github.com/TheJusticeMan/template-cross-platform-app"
  }
  ```

### 2. capacitor.config.json

- Removed deprecated `bundledWebRuntime` option

## Build Verification

Run the comprehensive build verification script:

```bash
npm run verify:builds
```

Or use the script directly:

```bash
bash scripts/verify-builds.sh
```

This tests all build targets and confirms everything works correctly.

## Individual Build Commands

```bash
# Web development (hot reload)
npm run dev

# Web production build
npm run build

# Lint code
npm run lint

# Format code
npm run format

# Generate documentation
npm run docs:generate

# Electron development
npm run electron:dev

# Electron production packages
npm run electron:build

# Capacitor sync (after web build)
npm run cap:sync

# Complete Capacitor build
npm run cap:build

# Deploy to GitHub Pages
npm run web:deploy

# Full release
npm run release
```

## Build Size Metrics

- **Web Bundle**: ~1KB (minified JS)
- **Web Total**: ~16KB (including HTML, CSS, sourcemaps)
- **Documentation**: ~76KB
- **Total dist/**: ~100KB
- **Electron AppImage**: ~112MB
- **Electron .deb**: ~88MB

## CI/CD Notes

The GitHub Actions workflow (`.github/workflows/release.yml`) automatically:

1. Runs on git tags (`v*`)
2. Builds all targets
3. Generates documentation
4. Deploys to GitHub Pages
5. Creates GitHub Release with artifacts
6. Attaches Electron packages and Capacitor APK

## Troubleshooting

### Electron Build Fails with "email required"

**Solution**: Ensure package.json has author.email field (now configured)

### Capacitor Requires Node 22+

**Solution**: Currently using Capacitor v6 which supports Node 20. Upgrade both when ready.

### GitHub Token Error in Electron Build

**Solution**: This is optional for local builds. For CI/CD, set `GH_TOKEN` environment variable.

### Hot Reload Not Working

**Solution**: Check that port 3000 is available. The dev server runs on http://localhost:3000

## Last Updated

2026-02-03

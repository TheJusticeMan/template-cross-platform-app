# Developer Guide

Comprehensive guide for building, deploying, and extending the Cross-Platform TypeScript App. For user perspective, see [UserGuide.md](UserGuide.md).

## Prerequisites

- **Node.js 20+** and npm
- **Git** for version control
- **Java 17+** and Android SDK (for mobile builds)
- **Xcode** (macOS only, for iOS builds)

## Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/TheJusticeMan/template-cross-platform-app
cd template-cross-platform-app
```

### 2. Install Dependencies

```bash
npm install
```

Installs ESBuild, TypeScript, Electron, Capacitor, ESLint, TypeDoc, and other dev tools (~500 packages, 200MB).

### 3. Start Development Server

```bash
npm run dev
```

**What happens:**
- ESBuild compiles TypeScript to JavaScript
- Dev server starts on `http://localhost:3000`
- File watcher detects changes (<5ms rebuild)
- Browser auto-refreshes on updates

**Development Features:**
- Inline sourcemaps (debug original TypeScript in browser)
- Hot reload (see changes instantly)
- Error overlay (compile errors appear in browser)

### 4. Generate API Documentation

```bash
npm run docs:generate
```

**What happens:**
- TypeDoc reads TsDoc comments from `src/`
- Generates markdown files in `docs/generated/`
- Updates API documentation automatically

**When to run**: After adding/modifying TsDoc comments in code.

## Building for Production

### Web (Static Bundle)

```bash
npm run build
```

**Output**: `dist/` directory
- `index.js` (1KB minified)
- `index.js.map` (6KB sourcemap)
- `index.html`, `index.css`
- `docs/` (25KB documentation)

**Deploy**: Upload `dist/` to any static host (GitHub Pages, Netlify, Vercel, S3).

### Desktop (Electron)

**Development Build:**
```bash
npm run electron:dev
```

Opens Electron window with DevTools. Good for testing desktop-specific features.

**Production Packages:**
```bash
npm run electron:build
```

**Output**: `electron-dist/` directory
- **Windows**: `.exe`, `.nsis` installer (~50-100MB)
- **macOS**: `.dmg`, `.zip` (~50-100MB)
- **Linux**: `.AppImage`, `.deb` (~50-100MB)

**Code Signing**:
- macOS: Set `CSC_IDENTITY_AUTO_DISCOVERY=true` + Apple Developer cert
- Windows: Configure `certificateFile` in `electron-builder.json`

### Mobile (Capacitor)

**Initial Setup:**
```bash
npm run cap:init
```

Prompts for app name and ID (e.g., `com.yourname.app`).

**Build and Sync:**
```bash
npm run cap:build
```

Copies `dist/` to native projects and syncs plugins.

**Android:**
```bash
npm run cap:open:android
```

Opens Android Studio. Build APK/AAB via `Build > Build Bundle(s)/APK(s)`.

**iOS (macOS only):**
```bash
npx cap open ios
```

Opens Xcode. Build for device/simulator, archive for App Store.

## Documentation Workflow

### Auto-Generate from Code

TsDoc comments in source files automatically generate markdown:

**1. Write TsDoc:**
```typescript
/**
 * @class MyComponent
 * Brief description of component purpose.
 * 
 * @param {string} label - Display label for component.
 * @returns {HTMLElement} - Rendered component element.
 * 
 * @example
 * const comp = new MyComponent("Hello");
 * document.body.append(comp.element);
 * 
 * @remarks
 * - Accessibility: Uses semantic HTML, ARIA labels.
 * - Performance: <1ms render time.
 */
```

**2. Generate Docs:**
```bash
npm run docs:generate
```

**3. Review Output:**
Check `docs/generated/` for generated markdown files.

### Documentation Structure

User-facing docs in `/docs`:
- `index.md` - Navigation hub
- `UserGuide.md` - App usage for end-users
- `Features.md` - Feature walkthroughs
- `API.md` - High-level API overview + links to generated docs
- `DeveloperGuide.md` - This file
- `Troubleshooting.md` - Issue resolution
- `Contributing.md` - Contribution guidelines
- `Changelog.md` - Version history

Generated docs in `/docs/generated/`:
- `README.md` - API index
- Per-class/function markdown (e.g., `classes/App.md`)

## Code Quality

### Linting

```bash
npm run lint        # Check for errors
npm run lint:fix    # Auto-fix where possible
```

**What it checks:**
- TypeScript types (strict mode)
- ESLint rules (no unused vars, etc.)
- TsDoc completeness (required on all public members)

### Documentation Validation

```bash
npm run docs:validate
```

**What it checks:**
- Lints code
- Validates TsDoc comments (via TypeDoc dry-run)
- Ensures all classes/functions documented

**Pre-commit hook** runs this automatically via Husky.

## Testing

### Manual Testing

**Browser:**
1. `npm run dev`
2. Open `http://localhost:3000`
3. Test UI interactions
4. Check console for errors

**Electron:**
1. `npm run electron:dev`
2. Test desktop-specific features
3. Check DevTools console

**Mobile:**
1. `npm run cap:build`
2. Deploy to device/emulator
3. Test touch interactions

### Debugging

**Browser/Electron:**
- Open DevTools (F12)
- Sources tab → see original TypeScript (via sourcemaps)
- Set breakpoints, inspect variables

**Mobile:**
- **Android**: `chrome://inspect` in Chrome desktop
- **iOS**: Safari DevTools (Develop > Simulator)

## Deployment

### GitHub Pages (Automated)

On tagged release:
```bash
npm run release v1.0.0
```

**What happens:**
1. Lints code
2. Generates docs
3. Builds production bundle
4. Creates git tag
5. Pushes tag → triggers GitHub Actions
6. Actions deploys to Pages, builds Electron packages, generates Android APK, creates release

**Live URL**: `https://<username>.github.io/<repo>/`

### Manual Deploy

```bash
npm run web:deploy
```

Deploys `dist/` directly to GitHub Pages (no release creation).

### Custom Hosting

Upload `dist/` to any static host:
- **Netlify**: Link GitHub repo, build command: `npm run build`, output: `dist`
- **Vercel**: Same as Netlify
- **AWS S3**: Upload `dist/`, enable static hosting
- **Self-hosted**: Serve via nginx, Apache, or Node.js (`npx serve dist`)

## Extending the App

### Adding New Components

**1. Create TsDoc-Documented Class:**

```typescript
/**
 * @class Toggle
 * Accessible toggle button with state management.
 * 
 * @param {string} onLabel - Label when toggle is on.
 * @param {string} offLabel - Label when toggle is off.
 * @returns {Toggle} - Toggle instance.
 * 
 * @remarks
 * - Accessibility: Auto-sets aria-pressed, role="switch".
 * - Performance: <1ms state updates.
 */
class Toggle {
  // Implementation
}
```

**2. Generate Docs:**
```bash
npm run docs:generate
```

**3. Link in UserGuide/Features:**
Update `UserGuide.md` or `Features.md` to reference the new component.

### Project Structure

```
src/              # Source TypeScript
docs/             # User-facing documentation
docs/generated/   # Auto-generated API docs (gitignored)
scripts/          # Build scripts
electron/         # Electron main process
dist/             # Build output
```

## Resources

- **TypeDoc**: [https://typedoc.org/](https://typedoc.org/)
- **ESBuild**: [https://esbuild.github.io/](https://esbuild.github.io/)
- **Electron**: [https://www.electronjs.org/](https://www.electronjs.org/)
- **Capacitor**: [https://capacitorjs.com/](https://capacitorjs.com/)

---

**Next**: See [Contributing](Contributing.md) for contribution guidelines or [API Documentation](API.md) for technical reference.

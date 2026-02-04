# Architecture Overview

## System Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Source Code (src/)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  index.ts    │  │  index.html  │  │  index.css   │      │
│  │ (TypeScript) │  │   (HTML5)    │  │    (CSS3)    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
    ┌─────────────────────────────────────────────────┐
    │           ESBuild (scripts/build.js)            │
    │  • TypeScript → JavaScript (ES2020)             │
    │  • Minification (prod)                          │
    │  • Sourcemaps (external for prod)               │
    │  • Bundle to dist/                              │
    └─────────────────┬───────────────────────────────┘
                      │
        ┌─────────────┴─────────────┬─────────────────┐
        ▼                           ▼                 ▼
    ┌────────┐              ┌──────────────┐   ┌────────────┐
    │  Web   │              │   Electron   │   │ Capacitor  │
    │Browser │              │   Desktop    │   │   Mobile   │
    └────────┘              └──────────────┘   └────────────┘
```

## Components

### 1. Source Layer (`src/`)

#### index.ts

- **Purpose**: Main application logic
- **Pattern**: Class-based with TsDoc
- **Responsibilities**:
  - DOM initialization
  - Event handling
  - State management
  - Environment detection

#### index.html

- **Purpose**: HTML structure
- **Pattern**: Semantic HTML5
- **Features**:
  - Minimal markup
  - Accessibility attributes
  - Links to compiled JS/CSS

#### index.css

- **Purpose**: Styling
- **Pattern**: Vanilla CSS3
- **Features**:
  - Responsive design
  - Accessibility support
  - Modern CSS features

### 2. Build System (`scripts/`)

#### dev.js

- **Purpose**: Development server
- **Features**:
  - ESBuild watch mode
  - Hot reload
  - Inline sourcemaps
  - Live server on port 3000

#### build.js

- **Purpose**: Production build
- **Features**:
  - TypeScript compilation
  - Minification
  - External sourcemaps
  - Recursive docs copy to dist/

#### release.sh

- **Purpose**: Release automation
- **Steps**:
  1. Run linting
  2. Validate documentation
  3. Generate API docs
  4. Build production
  5. Create git tag
  6. Trigger CI/CD

### 3. Documentation System

#### TypeDoc Pipeline

```
src/index.ts (TsDoc comments)
        ↓
typedoc --options typedoc.json
        ↓
docs/generated/ (Markdown)
        ↓
Links in docs/API.md
        ↓
Copy to dist/docs/ (offline access)
```

#### Documentation Structure

- **User-facing**: docs/\*.md (guides, features, troubleshooting)
- **Generated**: docs/generated/\*.md (API reference)
- **Standards**: CODE_GUIDELINES.md (coding rules)

### 4. Quality Gates

#### Pre-commit (Husky)

```
git commit
    ↓
.husky/pre-commit
    ↓
npm run lint (ESLint + jsdoc)
    ↓
npm run docs:validate (TypeDoc dry-run)
    ↓
[Pass] → Commit succeeds
[Fail] → Commit blocked
```

#### Continuous Integration

```
git push tag v*
    ↓
.github/workflows/release.yml
    ↓
1. Lint code
2. Generate docs
3. Build production
4. Deploy to GitHub Pages
5. Build Electron packages
6. Build Capacitor APK
7. Create GitHub release
```

### 5. Platform Targets

#### Web Browser

- **Output**: dist/index.html, dist/index.js, dist/index.css
- **Size**: ~1KB minified JS
- **Deployment**: Static hosting (GitHub Pages, Netlify, etc.)

#### Electron Desktop

- **Entry**: electron/main.js
- **Loads**: dist/ content
- **Output**: Platform-specific installers
- **Platforms**: Windows (.exe), macOS (.dmg), Linux (.AppImage)

#### Capacitor Mobile

- **Platform**: android/, ios/ (generated)
- **WebView**: Loads dist/ content
- **Output**: Native APK/IPA
- **Features**: Native plugin access

## Data Flow

### Application Initialization

```
1. Browser loads index.html
2. HTML loads index.js and index.css
3. JavaScript executes:
   a. DOMContentLoaded listener
   b. Query DOM elements
   c. Attach event listeners
   d. Log environment
4. User interactions trigger handlers
5. Handlers update DOM directly
```

### Build Flow

```
Source (src/)
    ↓
TypeScript Compiler (tsc --noEmit) [validation]
    ↓
ESBuild (compile + bundle)
    ↓
Minification (prod only)
    ↓
Sourcemap generation
    ↓
Copy HTML/CSS
    ↓
Copy docs/
    ↓
Output to dist/
```

### Documentation Flow

```
Write code with TsDoc
    ↓
Run: npm run docs:generate
    ↓
TypeDoc reads TsDoc comments
    ↓
Generate markdown in docs/generated/
    ↓
Update links in docs/API.md
    ↓
Build copies all docs to dist/docs/
    ↓
Docs available offline in app
```

## Technology Stack

### Core Technologies

- **TypeScript 5.3+**: Type-safe development
- **ESBuild**: Fast bundling (<10ms)
- **ESLint 9**: Code quality + jsdoc plugin
- **TypeDoc**: API documentation generator

### Platform Technologies

- **Electron 28**: Desktop wrapper
- **Capacitor 6**: Mobile wrapper
- **Husky 9**: Git hooks
- **electron-builder**: Desktop packaging

### Development Tools

- **serve**: Local HTTP server for docs
- **gh-pages**: GitHub Pages deployment
- **typescript-eslint**: TypeScript linting

## Design Patterns

### 1. Class-Based Components

```typescript
class Component {
  element: HTMLElement;
  private state: State;

  constructor(config: Config) {
    this.element = document.createElement('div');
    this.state = this.initState(config);
    this.render();
    this.attachListeners();
  }

  private render(): void {
    /* ... */
  }
  private attachListeners(): void {
    /* ... */
  }
}
```

### 2. Event-Driven Architecture

- Native event listeners
- Event delegation where appropriate
- Keyboard event handlers alongside click
- No custom event system

### 3. Direct DOM Manipulation

```typescript
// Create
const element = document.createElement('button');

// Update
element.textContent = 'New Text';
element.setAttribute('aria-pressed', 'true');

// Query
const button = document.getElementById('myButton');
const items = document.querySelectorAll('.item');

// Remove
element.remove();
```

### 4. State Management

- Class private properties
- Direct state updates
- No state library (Redux, MobX, etc.)
- Simple, predictable flow

## File Organization

```
.
├── .github/
│   ├── workflows/
│   │   └── release.yml          # CI/CD pipeline
│   └── copilot-instructions.md  # GitHub Copilot rules
├── .husky/
│   └── pre-commit               # Git hook: lint + validate
├── .vscode/
│   ├── extensions.json          # Recommended extensions
│   └── settings.json            # Workspace settings
├── docs/
│   ├── generated/               # Auto-generated API docs
│   │   ├── README.md
│   │   └── classes/App.md
│   ├── UserGuide.md             # User-facing guide
│   ├── DeveloperGuide.md        # Developer reference
│   ├── Features.md              # Feature walkthrough
│   ├── API.md                   # API overview
│   ├── Troubleshooting.md       # Issue resolution
│   ├── Contributing.md          # Contribution guide
│   ├── Changelog.md             # Version history
│   └── index.md                 # Documentation hub
├── electron/
│   └── main.js                  # Electron main process
├── scripts/
│   ├── dev.js                   # Development server
│   ├── build.js                 # Production build
│   └── release.sh               # Release automation
├── src/
│   ├── index.ts                 # Main application
│   ├── index.html               # HTML template
│   ├── index.css                # Styles
│   └── .nojekyll                # GitHub Pages config
├── .aiderignore                 # Aider AI ignore patterns
├── .clinerules                  # Cline/Claude rules
├── .cursorrules                 # Cursor AI rules
├── .gitignore                   # Git ignore patterns
├── AI_CONTEXT.md                # AI agent context
├── ARCHITECTURE.md              # This file
├── CODE_GUIDELINES.md           # Coding standards
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT license
├── README.md                    # Project overview
├── capacitor.config.json        # Capacitor configuration
├── electron-builder.json        # Electron build config
├── eslint.config.js             # ESLint configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── typedoc.json                 # TypeDoc configuration
```

## Configuration Files

### tsconfig.json

- **Strict mode**: Enabled
- **Target**: ES2020
- **Module**: ES2020
- **Module resolution**: Node

### eslint.config.js

- **Parser**: typescript-eslint
- **Plugins**: jsdoc
- **Rules**: Enforces TsDoc completeness

### typedoc.json

- **Output**: docs/generated/
- **Format**: Markdown
- **Plugin**: typedoc-plugin-markdown

### electron-builder.json

- **Output**: electron-dist/
- **Targets**: dmg, exe, AppImage
- **Files**: dist/, electron/main.js

### capacitor.config.json

- **App ID**: com.template.crossplatform
- **Web dir**: dist/
- **Platforms**: android, ios

## Performance Characteristics

### Build Performance

- **Development**: <5ms rebuild (hot reload)
- **Production**: <10ms full build
- **Documentation**: <2s TypeDoc generation

### Runtime Performance

- **Bundle size**: 1KB minified JS
- **Load time**: <50ms (local)
- **UI operations**: <1ms
- **Memory**: <5MB baseline

### Optimization Strategies

1. **No frameworks**: Reduces bundle size by 100KB+
2. **Tree shaking**: ESBuild removes unused code
3. **Minification**: Production code compressed
4. **Code splitting**: Not needed (tiny bundle)
5. **Lazy loading**: Not needed (tiny bundle)

## Security Considerations

### Content Security Policy

- Default-src 'self'
- No inline scripts in production
- External sourcemaps for debugging

### Dependencies

- Minimal dependencies (dev only)
- Regular audits via npm audit
- No runtime dependencies

### Input Validation

- Sanitize user input
- Use textContent (not innerHTML)
- Validate DOM queries

## Extensibility Points

### Adding Features

1. Create new class in src/
2. Add complete TsDoc
3. Use native APIs
4. Generate docs
5. Update guides

### Platform-Specific Code

```typescript
const isElectron = navigator.userAgent.includes('electron');
const isCapacitor = !!(window as any).Capacitor;

if (isElectron) {
  // Desktop-specific features
} else if (isCapacitor) {
  // Mobile-specific features
} else {
  // Web-specific features
}
```

### Plugin System

- No formal plugin system
- Extend via TypeScript classes
- Document with TsDoc
- Maintain vanilla purity

## Testing Strategy

### Current Approach

- Manual testing in browser
- Manual testing in Electron
- Manual testing on mobile
- Keyboard navigation testing
- Screen reader testing

### Quality Assurance

- Pre-commit linting
- Documentation validation
- Type checking
- Build verification
- Cross-platform testing

### Future Considerations

- Unit tests (Jest or Vitest)
- E2E tests (Playwright)
- Visual regression tests
- Performance benchmarks

## Deployment Architecture

### GitHub Pages

```
dist/ → GitHub Pages → https://user.github.io/repo/
  ├── index.html
  ├── index.js
  ├── index.css
  └── docs/
```

### Electron Distribution

```
electron-dist/
  ├── win/     → Windows installer
  ├── mac/     → macOS DMG
  └── linux/   → AppImage/DEB
```

### Capacitor Apps

```
Android: android/app/build/outputs/apk/
iOS: ios/App/build/
```

## Principles Reinforced by Architecture

1. **Simplicity**: Minimal tooling, clear structure
2. **Performance**: Fast builds, small bundles
3. **Maintainability**: Documentation enforced, standards clear
4. **Accessibility**: Built into patterns, validated by linting
5. **Portability**: Cross-platform by design
6. **Transparency**: No hidden magic, native APIs
7. **Quality**: Multiple validation layers

This architecture supports rapid development while maintaining high quality standards and cross-platform compatibility.

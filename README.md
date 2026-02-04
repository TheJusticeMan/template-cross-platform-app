# Cross-Platform TypeScript Application

Build interactive, accessible applications that run everywhere: web browsers, desktop (Electron), and mobile devices (Capacitor).

**Pure vanilla TypeScript/JavaScript—no frameworks, no bloat.**

---

## 📚 Documentation

**For Users** (using the application):

- **[User Guide](docs/UserGuide.md)** - Get started with the application
- **[Features](docs/Features.md)** - Explore capabilities
- **[Troubleshooting](docs/Troubleshooting.md)** - Resolve issues

**For Developers** (building and extending):

- **[Developer Guide](docs/DeveloperGuide.md)** - Build, deploy, extend
- **[API Reference](docs/API.md)** - Customize functionality
- **[Contributing](docs/Contributing.md)** - Contribution guidelines

**Quick Start**: [Documentation Hub](docs/index.md)

---

## 🚀 Quick Start

### For Users

**Run in Browser:**
Open `dist/index.html` in any modern browser (Chrome, Firefox, Safari, Edge)

**Install Desktop App:**
Download installer for your platform from [Releases](https://github.com/TheJusticeMan/template-cross-platform-app/releases)

**Install Mobile App:**
Download APK (Android) or IPA (iOS) from releases

### For Developers

**1. Clone & Install:**

```bash
git clone https://github.com/TheJusticeMan/template-cross-platform-app
cd template-cross-platform-app
npm install
```

**2. Start Development:**

```bash
npm run dev
```

Opens at `http://localhost:3000` with hot reload

**3. Build for Production:**

```bash
npm run build
```

**4. Generate Documentation:**

```bash
npm run docs:generate
```

See [Developer Guide](docs/DeveloperGuide.md) for complete instructions.

---

## ✨ Key Features

### For Users

- **Accessible by Default**: Keyboard navigation, ARIA support, semantic HTML
- **Cross-Platform**: Same experience on web, desktop, mobile
- **Offline Documentation**: Help available in-app without internet
- **No Unnecessary Complexity**: Straightforward, predictable interaction

### For Developers

- **Lightning-Fast Builds**: <5ms development, <10ms production
- **Hot Reload**: See changes instantly (<1ms)
- **Auto-Generated Docs**: TypeDoc creates API docs from TsDoc comments
- **Strict Quality**: Enforced documentation, linting, pre-commit validation
- **Bundle Size**: 1KB minified JS (your code), <80KB total with docs
- **DOM Extensions**: Obsidian-style utilities for element creation and styling

---

## 🎨 DOM Extensions

Built-in utilities for creating and styling DOM elements with a clean, declarative API:

```typescript
// Import extensions
import './dom-extensions';

// Create elements declaratively
const card = document.body.createDiv({ cls: 'card' }).setCssStyles({
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
});

// Add content with options and callbacks
card.createEl('h2', { text: 'Card Title' });
card.createEl('button', { text: 'Click Me' }, (btn) => {
  btn.addEventListener('click', () => alert('Clicked!'));
});
```

Features:

- `createEl`, `createDiv`, `createSpan`, `createSvg` - Element creation
- `setCssStyles` - Batch style application
- `setCssProps` - CSS custom properties (variables)
- `setText` - Get/set text content
- Full TypeScript support with generics
- Method chaining for fluent API

See **[DOM Extensions Documentation](docs/DOMExtensions.md)** for complete API and examples.

---

## 🏗️ Technology Stack

- **TypeScript 5.9+**: Strict mode, ES2020 target
- **ESBuild**: Fast bundler and dev server
- **Electron 40**: Desktop applications
- **Capacitor 8**: Mobile applications (Android/iOS)
- **TypeDoc**: Auto-generate documentation from code
- **ESLint + TsDoc**: Enforced code quality and documentation
- **Prettier**: Code formatting for consistency

**Philosophy**: Pure vanilla TypeScript/JavaScript using native browser APIs. No React, Vue, Angular, or jQuery. Standards endure.

---

## 📦 Available Scripts

| Script                   | Description                               |
| ------------------------ | ----------------------------------------- |
| `npm run dev`            | Start development server with hot reload  |
| `npm run build`          | Build production bundle                   |
| `npm run format`         | Format all code with Prettier             |
| `npm run format:check`   | Check if code is formatted                |
| `npm run docs:generate`  | Generate API docs from TsDoc              |
| `npm run docs:validate`  | Validate TsDoc completeness               |
| `npm run docs:serve`     | Preview documentation locally (port 8001) |
| `npm run lint`           | Run ESLint with TsDoc validation          |
| `npm run lint:fix`       | Auto-fix linting issues                   |
| `npm run electron:dev`   | Run in Electron                           |
| `npm run electron:build` | Build Electron packages                   |
| `npm run cap:build`      | Build and sync for Capacitor              |
| `npm run web:deploy`     | Deploy to GitHub Pages                    |
| `npm run release`        | Create tagged release                     |
| `npm run verify:builds`  | Verify all build targets work correctly   |

---

## 🧩 Project Structure

```
template-cross-platform-app/
├── src/                    # TypeScript source code
│   ├── index.ts           # Main application (TsDoc required)
│   ├── index.html         # HTML template
│   └── index.css          # Styles
├── docs/                  # User & developer documentation
│   ├── index.md           # Documentation hub
│   ├── UserGuide.md       # For app users
│   ├── Features.md        # Feature walkthrough
│   ├── DeveloperGuide.md  # For developers
│   ├── API.md             # API overview
│   ├── generated/         # Auto-generated API docs (TypeDoc)
│   └── images/            # Screenshots
├── dist/                  # Build output (generated)
│   ├── index.js           # Bundled JavaScript
│   ├── index.js.map       # Source maps
│   └── docs/              # Documentation (offline access)
├── electron/              # Electron desktop app
│   └── main.js           # Electron main process
├── scripts/               # Build scripts
│   ├── dev.js            # Development server
│   ├── build.js          # Production build
│   └── release.sh        # Release automation
└── .github/workflows/     # CI/CD
    └── release.yml       # Automated releases
```

---

## 🔒 Code Quality

**Mandatory TsDoc** on all public classes, methods, and functions:

```typescript
/**
 * @class MyComponent
 * Brief description of purpose.
 *
 * @param {string} label - Parameter description.
 * @returns {HTMLElement} - Return value description.
 *
 * @example
 * const comp = new MyComponent("Hello");
 *
 * @remarks
 * - Accessibility: ARIA support details
 * - Performance: <1ms operation
 */
```

**Pre-commit hooks** enforce:

- ESLint validation
- TsDoc completeness
- TypeDoc generation validation

See [CODE_GUIDELINES.md](CODE_GUIDELINES.md) for complete standards.

---

## ✅ Build Verification

**Verify all build targets work correctly:**

```bash
npm run verify:builds
```

This comprehensive script tests:

- ✓ ESLint validation
- ✓ Prettier formatting
- ✓ Web production build
- ✓ Documentation generation
- ✓ Electron package creation
- ✓ Capacitor sync

See [BUILD_NOTES.md](BUILD_NOTES.md) for detailed build configuration and troubleshooting.

---

## 🚀 Deployment

### Automated (Recommended)

Tag a release to trigger GitHub Actions:

```bash
npm run release v1.0.0
```

**Deploys automatically**:

- Web app to GitHub Pages
- Electron packages for Windows/Mac/Linux
- Capacitor APK for Android
- GitHub Release with all assets

### Manual

```bash
npm run web:deploy     # Deploy to GitHub Pages
npm run electron:build # Build desktop packages
npm run cap:build      # Build mobile apps
```

See [Developer Guide](docs/DeveloperGuide.md) for detailed deployment instructions.

---

## 🤝 Contributing

Contributions welcome! See [Contributing Guide](docs/Contributing.md) for:

- Reporting bugs
- Suggesting features
- Code contribution workflow
- Development standards

**Before contributing**: Read [CODE_GUIDELINES.md](CODE_GUIDELINES.md)

---

## 🤖 AI Agent Ready

This repository is optimized for AI coding assistants. Configuration files for:

- **Cursor**: `.cursorrules` - Cursor AI rules
- **Cline/Claude**: `.clinerules` - Claude Dev rules
- **GitHub Copilot**: `.github/copilot-instructions.md`
- **Aider**: `.aiderignore` - Ignore patterns

### Key Resources for AI Agents

- **[AI_CONTEXT.md](AI_CONTEXT.md)** - Quick project overview and patterns
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Detailed system design
- **[CODE_GUIDELINES.md](CODE_GUIDELINES.md)** - Coding standards (must read)
- **[prompts/](prompts/)** - Common task templates

### Using AI Assistants

When asking AI for help:

1. Reference `CODE_GUIDELINES.md` for standards
2. Emphasize vanilla purity (no frameworks)
3. Require complete TsDoc documentation
4. Ensure accessibility (ARIA, keyboard, semantic HTML)
5. Use prompts from `prompts/` directory for common tasks

See [AI_CONTEXT.md](AI_CONTEXT.md) for detailed guidance.

---

## 📄 License

MIT License - Use freely for any project.

---

## 🔗 Links

- **Documentation**: [/docs](docs/index.md)
- **Issues**: [GitHub Issues](https://github.com/TheJusticeMan/template-cross-platform-app/issues)
- **Releases**: [GitHub Releases](https://github.com/TheJusticeMan/template-cross-platform-app/releases)
- **Discussions**: [GitHub Discussions](https://github.com/TheJusticeMan/template-cross-platform-app/discussions)

---

**Built with TypeScript, ESBuild, Electron, and Capacitor. No frameworks—just standards.**

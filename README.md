# Cross-Platform TypeScript Application Template

A comprehensive template for building cross-platform applications with TypeScript, ESBuild, Electron, and Capacitor. Deploy to web (GitHub Pages), desktop (Windows/Mac/Linux), and mobile (Android/iOS).

> **📚 Full Documentation**: See [/docs](docs/) for comprehensive guides. Start with [Setup.md](docs/Setup.md).
>
> **👨‍💻 AI/Human Contributors**: Read [CODE_GUIDELINES.md](CODE_GUIDELINES.md) before contributing.

## 🚀 Features

- **TypeScript** - Type-safe development with strict mode
- **ESBuild** - Lightning-fast builds (<5ms)
  - Development: Watch mode, live reload, inline source maps
  - Production: Minification, external source maps
- **ESLint** - Code quality with **mandatory TsDoc** (enforced via eslint-plugin-jsdoc)
- **Electron** - Desktop application support (Windows, Mac, Linux)
- **Capacitor** - Mobile application support (Android, iOS)
- **GitHub Pages** - Automated web deployment with `/docs` included
- **GitHub Actions** - CI/CD pipeline with automatic releases
- **Documentation** - Comprehensive `/docs` bundled with builds for offline access

## 📚 User Help

All documentation is bundled with production builds (`dist/docs/`) and deployed to GitHub Pages:

- **[Setup.md](docs/Setup.md)** - Quickstart guide with first GUI tweak example
- **[Build.md](docs/Build.md)** - Platform-specific builds (web/desktop/mobile) and sourcemap debugging
- **[Deploy.md](docs/Deploy.md)** - Release process, GitHub Pages, custom hosting
- **[API.md](docs/API.md)** - Auto-scaffolded public API overview (from TsDoc)
- **[Troubleshooting.md](docs/Troubleshooting.md)** - Common issues with reflective fixes
- **[Contributing.md](docs/Contributing.md)** - How to extend without bloat

**Preview docs locally**:
```bash
npm run docs:serve
# Opens at http://localhost:8001
```

## 📁 Project Structure

```
.
├── src/                    # Source files
│   ├── index.ts           # Main TypeScript application (TsDoc mandatory)
│   ├── index.html         # HTML template
│   └── index.css          # Styles
├── docs/                  # User documentation (bundled to dist/docs/)
│   ├── Setup.md
│   ├── Build.md
│   ├── Deploy.md
│   ├── API.md
│   ├── Troubleshooting.md
│   └── Contributing.md
├── dist/                  # Build output (generated)
│   └── docs/              # Docs copied here for offline access
├── electron/              # Electron-specific files
│   └── main.js           # Electron main process
├── scripts/               # Build scripts
│   ├── dev.js            # Development server
│   ├── build.js          # Production build (copies docs)
│   └── release.sh        # Release automation
├── .github/workflows/     # GitHub Actions
│   └── release.yml       # Release workflow (deploys docs to Pages)
├── CODE_GUIDELINES.md     # Agent & contributor standards
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint with jsdoc rules
├── capacitor.config.json  # Capacitor configuration
└── electron-builder.json  # Electron Builder configuration
```

## 🛠️ Setup

### Prerequisites

- Node.js 20+ and npm
- Git
- For Android builds: Java 17+, Android SDK
- For iOS builds (Mac only): Xcode

### Installation

1. **Clone or use this template:**
   ```bash
   git clone <repository-url>
   cd template-cross-platform-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize Capacitor (optional, for mobile):**
   ```bash
   npm run cap:init
   ```

## 🎯 Development

### Web Development

Start the development server with hot reload:
```bash
npm run dev
```
Opens at `http://localhost:3000`

### Electron Development

Run the app in Electron:
```bash
npm run electron:dev
```

### Mobile Development (Capacitor)

1. Build and sync to mobile platforms:
   ```bash
   npm run cap:build
   ```

2. Open in Android Studio:
   ```bash
   npm run cap:open:android
   ```

3. Open in Xcode (Mac only):
   ```bash
   npx cap open ios
   ```

## 🏗️ Building

### Production Web Build

Build optimized production bundle:
```bash
npm run build
```

### Build Electron Desktop Apps

Create desktop installers:
```bash
npm run electron:build
```

Outputs to `electron-dist/`:
- Windows: `.exe`, `.nsis`
- Mac: `.dmg`, `.zip`
- Linux: `.AppImage`, `.deb`

### Build Mobile Apps

Sync and build for mobile:
```bash
npm run cap:sync
```

Then build in Android Studio or Xcode.

## 🧹 Code Quality

### Linting with TsDoc Enforcement

This template **requires TsDoc** (JSDoc-compatible) on all classes, functions, methods, and interfaces. Enforced via `eslint-plugin-jsdoc`.

Run ESLint:
```bash
npm run lint
```

Fix linting issues automatically:
```bash
npm run lint:fix
```

Validate documentation completeness:
```bash
npm run docs:validate
```

**TsDoc Template** (see [CODE_GUIDELINES.md](CODE_GUIDELINES.md) for full details):
```typescript
/**
 * @class ClassName
 * Brief description: What it does, why it exists.
 * 
 * @param {Type} paramName - Detailed description with constraints.
 * @returns {ReturnType} - What it returns, success/failure cases.
 * 
 * @example
 * // Usage example
 * const instance = new ClassName(arg);
 * 
 * @remarks
 * - Accessibility: ARIA/keyboard support.
 * - Ethics: User impact, transparency.
 * - Edge Cases: Error handling, performance.
 * - Thematic Tie: Reflective note (e.g., "Like Polaroid truth").
 * - Version: 1.0.0
 * - Author: Your Name
 */
```

Missing or incomplete TsDoc will **fail linting**. This ensures maintainability and API clarity.

## 🚀 Deployment

### Deploy to GitHub Pages

Deploy manually:
```bash
npm run web:deploy
```

### Create a Release

Automated release process (triggers on git tags):

```bash
npm run release v1.0.0
```

Or manually:
```bash
./scripts/release.sh v1.0.0
```

This will:
1. Run linting
2. Build production version
3. Create and push a git tag
4. Trigger GitHub Actions workflow

The GitHub Actions workflow will:
- Deploy web app to GitHub Pages
- Build Electron packages for all platforms
- Build Android APK
- Create GitHub Release with all assets

### Manual GitHub Actions Trigger

Push a tag to trigger the release workflow:
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle (includes copying docs) |
| `npm run lint` | Run ESLint with TsDoc validation |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run docs:build` | Build and copy docs to dist/docs |
| `npm run docs:validate` | Validate TsDoc completeness |
| `npm run docs:serve` | Preview docs locally (port 8001) |
| `npm run electron:dev` | Run app in Electron |
| `npm run electron:build` | Build Electron packages |
| `npm run cap:init` | Initialize Capacitor |
| `npm run cap:sync` | Sync web app to native platforms |
| `npm run cap:build` | Build and sync for mobile |
| `npm run cap:open:android` | Open in Android Studio |
| `npm run web:deploy` | Deploy to GitHub Pages |
| `npm run release` | Create tagged release (runs full workflow) |
| `npm run release` | Create tagged release |

## 🔧 Configuration

### Customization

1. **App Identity**: Update `appId` in `capacitor.config.json` and `electron-builder.json`
2. **App Name**: Update `appName` in `capacitor.config.json` and `productName` in `electron-builder.json`
3. **Package**: Update `name`, `description`, `author` in `package.json`
4. **Styling**: Modify `src/index.css`
5. **Functionality**: Extend `src/index.ts`

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The workflow will deploy to `https://<username>.github.io/<repo-name>/`

## 🤝 Contributing

This is a template repository. Use it as a starting point for your own projects!

## 📄 License

MIT License - feel free to use this template for any project.

## 🆘 Troubleshooting

### Common Issues

**Build fails with missing modules:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Electron window doesn't open:**
- Ensure `npm run build` was run first
- Check console for errors

**Capacitor sync fails:**
- Run `npm run cap:init` first
- Ensure `dist/` directory exists

**Android build fails:**
- Verify Java 17+ is installed
- Check Android SDK is properly configured

## 🔗 Resources

- [TypeScript Documentation](https://www.typescriptlang.org/)
- [ESBuild Documentation](https://esbuild.github.io/)
- [Electron Documentation](https://www.electronjs.org/)
- [Capacitor Documentation](https://capacitorjs.com/)
- [GitHub Actions Documentation](https://docs.github.com/actions)

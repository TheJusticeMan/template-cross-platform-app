# Cross-Platform TypeScript Application Template

A comprehensive template for building cross-platform applications with TypeScript, ESBuild, Electron, and Capacitor. Deploy to web (GitHub Pages), desktop (Windows/Mac/Linux), and mobile (Android/iOS).

## 🚀 Features

- **TypeScript** - Type-safe development
- **ESBuild** - Lightning-fast builds
  - Development: Watch mode, live reload, inline source maps
  - Production: Minification, external source maps
- **ESLint** - Code quality and consistency
- **Electron** - Desktop application support (Windows, Mac, Linux)
- **Capacitor** - Mobile application support (Android, iOS)
- **GitHub Pages** - Automated web deployment
- **GitHub Actions** - CI/CD pipeline with automatic releases

## 📁 Project Structure

```
.
├── src/                    # Source files
│   ├── index.ts           # Main TypeScript application
│   ├── index.html         # HTML template
│   └── index.css          # Styles
├── dist/                  # Build output (generated)
├── electron/              # Electron-specific files
│   └── main.js           # Electron main process
├── capacitor/             # Capacitor configuration
├── scripts/               # Build scripts
│   ├── dev.js            # Development server
│   ├── build.js          # Production build
│   └── release.sh        # Release automation
├── .github/workflows/     # GitHub Actions
│   └── release.yml       # Release workflow
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
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

Run ESLint:
```bash
npm run lint
```

Fix linting issues automatically:
```bash
npm run lint:fix
```

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
| `npm run build` | Build production bundle |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run electron:dev` | Run app in Electron |
| `npm run electron:build` | Build Electron packages |
| `npm run cap:init` | Initialize Capacitor |
| `npm run cap:sync` | Sync web app to native platforms |
| `npm run cap:build` | Build and sync for mobile |
| `npm run cap:open:android` | Open in Android Studio |
| `npm run web:deploy` | Deploy to GitHub Pages |
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

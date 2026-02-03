# Build Guide

Building for different platforms—web, desktop, mobile. Each has its rhythm, its own truth to tell.

## Web Build (Production)

```bash
npm run build
```

Creates optimized bundle in `dist/`:
- **Minified JS**: ~1KB (your code compresses beautifully)
- **External sourcemaps**: `.js.map` files for debugging production
- **Static assets**: HTML, CSS, copied verbatim

Output is GitHub Pages-ready. Serve it anywhere—no server needed, pure static truth.

### Debugging Production Builds

Sourcemaps let you trace minified code back to original TypeScript:

1. Open DevTools → Sources
2. Find your `index.js`
3. Browser auto-loads `.js.map`, shows original code
4. Set breakpoints, inspect as if in dev mode

Like retracing steps after amnesia—the map guides you back.

## Desktop Build (Electron)

### Development Mode

```bash
npm run electron:dev
```

Builds once, opens Electron window. DevTools included. Tweak `electron/main.js` for window size, permissions.

### Production Packages

```bash
npm run electron:build
```

Generates installers via Electron Builder:
- **Windows**: `.exe`, `.nsis` installer
- **macOS**: `.dmg`, `.zip` (code-signed if configured)
- **Linux**: `.AppImage`, `.deb`

Find them in `electron-dist/`. Size: ~50-100MB (includes Chromium runtime). That's the desktop price—heavy but cross-platform.

**Tips**:
- Code-sign on macOS (set `CSC_IDENTITY_AUTO_DISCOVERY=true`)
- Notarize for Catalina+ (requires Apple Developer account)
- Linux: AppImage needs no install, just `chmod +x` and run

## Mobile Build (Capacitor)

### Initialize Capacitor (First Time)

```bash
npm run cap:init
```

Prompts for app name, ID (e.g., `com.yourname.app`). Creates `capacitor.config.json`.

### Sync & Build

```bash
npm run cap:build
```

Copies `dist/` to native projects (Android/iOS), syncs plugins. Then:

**Android**:
```bash
npm run cap:open:android
```
Opens Android Studio. Build APK/AAB from there (`Build > Build Bundle(s)/APK(s)`). Sign for release (create keystore, configure `build.gradle`).

**iOS** (Mac only):
```bash
npx cap open ios
```
Opens Xcode. Build for device (need Apple Developer cert). Archive for App Store.

**Debugging Mobile**:
- Use Chrome DevTools via `chrome://inspect` (Android)
- Safari DevTools for iOS (`Develop > Simulator`)
- Console logs appear in native IDE too

## Performance Notes

- **Dev builds**: Unminified, inline maps, ~3ms compile (ESBuild speed)
- **Prod builds**: Minified, external maps, ~5ms (still blazing)
- **Hot reload**: <1ms change detection—like instant truth-seeking

Build for your target. Web: lightest. Desktop: most features. Mobile: widest reach. Choose wisely—each serves a purpose.

# Troubleshooting Guide

When things break—and they will—trace to source, fix reflectively.

## Development Server Issues

### Hot Reload Not Working

**Symptom**: Changes in `src/` don't reflect in browser.

**Diagnosis**:
- Check ESBuild logs in terminal (look for errors)
- Ensure `npm run dev` is still running (didn't crash)
- Verify file saved (sometimes editors delay writes)

**Fix**:
1. Stop dev server (`Ctrl+C`)
2. Delete `dist/` folder: `rm -rf dist`
3. Restart: `npm run dev`

Like a lost year—clear the slate, rebuild memory.

**Reflective Fix**: If it fails again, check file permissions. WSL on Windows? Symlinks can confuse watchers. Use native Node if possible.

### Port Already in Use

**Symptom**: `Error: listen EADDRINUSE: address already in use :::3000`

**Fix**:
- Find what's using port 3000: `lsof -ti:3000` (Mac/Linux) or `netstat -ano | findstr :3000` (Windows)
- Kill it: `kill -9 <PID>` or change port in `scripts/dev.js` (edit `port: 3000` to `port: 3001`)

**Reflective Fix**: Multiple projects? Name your terminals. Avoid confusion—clarity prevents betrayal (by yourself).

## Build Failures

### ESLint Errors Block Build

**Symptom**: `npm run build` fails with lint errors.

**Diagnosis**: Check output for specific rule violations (e.g., missing TsDoc, unused vars).

**Fix**:
- Auto-fix where possible: `npm run lint:fix`
- Manually fix remaining issues (often missing `@param` descriptions)
- Re-run `npm run build`

**Reflective Fix**: Linting is truth-seeking. It catches lazy shortcuts. Embrace it—write the docs, honor the contract.

### Missing Dependencies

**Symptom**: `Cannot find module 'esbuild'` or similar.

**Fix**:
```bash
rm -rf node_modules package-lock.json
npm install
```

Like amnesia—re-establish connections from scratch.

## Electron Issues

### Blank Window on `electron:dev`

**Symptom**: Electron opens, but shows blank screen.

**Diagnosis**:
- Open DevTools in Electron (`View > Toggle Developer Tools`)
- Check Console for errors (e.g., `Failed to load resource: dist/index.html`)

**Fix**:
1. Ensure `npm run build` ran successfully (check `dist/` exists and has files)
2. Verify `electron/main.js` path is correct: `path.join(__dirname, '..', 'dist', 'index.html')`
3. Rebuild: `npm run build && npm run electron:dev`

**Reflective Fix**: Electron loads from filesystem. If path is wrong, it loads nothing—silent failure. Verify paths like you'd verify trust: carefully.

### DevTools Not Opening in Production Build

**Symptom**: `electron:build` packages don't show DevTools.

**Explanation**: By design. In `electron/main.js`:
```javascript
if (process.env.NODE_ENV !== 'production') {
  mainWindow.webContents.openDevTools();
}
```

**Fix**: For debugging production builds, temporarily remove the `if` check, rebuild. Remember to restore it before final release.

## Capacitor Issues

### `cap sync` Fails

**Symptom**: `Error: Capacitor could not find config.`

**Fix**:
1. Ensure `capacitor.config.json` exists in root
2. Run `npm run cap:init` if first time
3. Check `webDir: "dist"` matches your build output
4. Run `npm run build` first (Capacitor needs built files to sync)

**Reflective Fix**: Capacitor bridges web and native. Both sides must agree on paths—like trust, it requires alignment.

### Android Build Errors

**Symptom**: Gradle fails with `JAVA_HOME` not set or SDK missing.

**Fix**:
- Set `JAVA_HOME`: `export JAVA_HOME=$(/usr/libexec/java_home)` (Mac) or point to JDK 17 dir
- Install Android SDK via Android Studio (Tools > SDK Manager)
- Ensure `ANDROID_HOME` set: `export ANDROID_HOME=~/Library/Android/sdk` (Mac)

Add to `.bashrc`/`.zshrc` for persistence.

**Reflective Fix**: Native builds need native tools. Embrace the setup—like laying foundations, it's tedious but necessary.

## Deployment Issues

### GitHub Actions Fails on Release

**Symptom**: Workflow fails during Pages deploy or package builds.

**Diagnosis**: Check Actions tab on GitHub, read logs.

**Common Causes**:
- **Lint failure**: Fix locally first (`npm run lint`)
- **Missing secrets**: Add `GITHUB_TOKEN` (usually auto-provided)
- **Build script error**: Test `npm run build` locally

**Fix**: Commit fixes, delete bad tag, re-tag:
```bash
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
# Fix issue, then:
git tag v1.0.0
git push origin v1.0.0
```

**Reflective Fix**: CI is unforgiving—good. It enforces discipline. Don't fight it, align with it.

### Pages Deploy Works But Site Broken

**Symptom**: Site loads but CSS/JS 404s.

**Diagnosis**: Likely path issue. GitHub Pages serves from `/<repo-name>/`, not root.

**Fix**: Update `index.html` to use relative paths:
```html
<!-- Not: /index.css -->
<link rel="stylesheet" href="index.css">
```

Or configure `publicPath` in build script (ESBuild doesn't need it for simple cases—keep it relative).

**Reflective Fix**: Absolute vs. relative—always think context. Where will this run? Plan accordingly.

## Still Stuck?

1. Re-read [Setup.md](Setup.md) and [Build.md](Build.md)—often the answer is in fundamentals
2. Check GitHub Issues on template repo (maybe it's a known bug)
3. Enable verbose logging (edit build scripts, add `logLevel: 'debug'`)
4. Ask in Discussions with clear error messages and steps to reproduce

Remember: Every bug is a teacher. Trace it, fix it, document what you learned. That's how knowledge compounds—like building truth from Polaroid snapshots, one clear frame at a time.

# Deploy Guide

From local builds to live deployments—making your work public, shareable, real.

## GitHub Pages Deployment

### Automated (Recommended)

On every tagged release (e.g., `v1.0.0`), GitHub Actions auto-deploys to Pages:

```bash
npm run release v1.0.0
```

This script:
1. Runs linting (fails if code quality issues)
2. Builds production bundle
3. Creates git tag
4. Pushes tag → triggers `.github/workflows/release.yml`

The workflow then:
- Deploys `dist/` to GitHub Pages via `peaceiris/actions-gh-pages`
- Builds Electron packages (all platforms)
- Generates Android APK
- Creates GitHub Release with all assets attached

Your app goes live at: `https://<username>.github.io/<repo-name>/`

**Tip**: Enable Pages in repo settings (Settings → Pages → Source: GitHub Actions).

### Manual Deployment

```bash
npm run web:deploy
```

Uses `gh-pages` package to push `dist/` directly. Quick, no release creation. Good for testing live URL.

## Custom Hosting

The `dist/` folder is pure static files. Host anywhere:

- **Netlify**: Drag-drop `dist/` or link GitHub (auto-builds on push)
- **Vercel**: Import repo, set build command: `npm run build`, output: `dist`
- **AWS S3**: Upload `dist/` to bucket, enable static hosting
- **Self-hosted**: Any web server (nginx, Apache, even Python `http.server`)

Example nginx config:
```nginx
server {
  listen 80;
  root /var/www/your-app/dist;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## Release Process (Full)

### 1. Pre-Release Checklist

- [ ] All code documented with TsDoc
- [ ] `npm run lint` passes
- [ ] `npm run docs:validate` passes
- [ ] Test dev/build/electron locally
- [ ] Update version in `package.json`
- [ ] Write CHANGELOG entry (if you have one)

### 2. Tag & Push

```bash
# Via helper script:
npm run release v1.2.3

# Or manually:
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
```

### 3. Monitor Workflow

Go to GitHub → Actions tab. Watch `release.yml` run (~5-10 minutes). Check for:
- ✅ Lint passes
- ✅ Build succeeds
- ✅ Pages deployed
- ✅ Electron packages created
- ✅ Release published

### 4. Verify Live

- **Pages**: Visit `https://<username>.github.io/<repo>/`
- **Release Assets**: Check GitHub Releases page for `.dmg`, `.exe`, `.apk`, etc.
- **Docs**: Confirm `/docs` accessible on Pages (e.g., `/docs/Setup.html`)

## Rollback

If deployment breaks:

1. Delete bad tag: `git tag -d v1.2.3 && git push origin :refs/tags/v1.2.3`
2. Previous release stays live on Pages (gh-pages branch history)
3. Revert local changes, fix, re-tag

Like a lost year—trace back to last known good state, rebuild from there.

## Advanced: Custom Domain

1. Add `CNAME` file to `src/` (copied to `dist/` on build):
   ```
   yourdomain.com
   ```
2. Update DNS: Add `CNAME` record pointing to `<username>.github.io`
3. Enable HTTPS in Pages settings

Now your app lives at `https://yourdomain.com`. Professional, permanent, yours.

Deploy with care. Every release is a statement—make it count.

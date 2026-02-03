# Features Guide

Explore the key capabilities of the Cross-Platform TypeScript App. Each feature is designed for clarity, accessibility, and performance.

## Interactive UI Components

### Click Counter with Visual Feedback

The application includes a responsive click counter demonstrating state management and user feedback:

**How it works:**

1. Click the "Click Me!" button
2. Counter increments instantly
3. Button scales down briefly (visual feedback)
4. State persists during session

**Technical Details:**

- Performance: <1ms response time
- Accessibility: Keyboard-accessible (Tab + Enter/Space)
- Visual: GPU-accelerated animations (no layout thrashing)

<!-- Screenshot placeholder -->
<!-- ![Click Counter](images/click-counter.png) -->

### Environment Detection

The app automatically detects its runtime environment:

**Supported Platforms:**

- **Browser**: Standard web environment (Chrome, Firefox, Safari, Edge)
- **Electron**: Desktop application (Windows, macOS, Linux)
- **Capacitor**: Mobile application (Android, iOS)

**What it does:**

- Logs environment to console on startup
- Adapts behavior based on platform (if needed)
- Provides context-aware features

Check your browser console (F12) to see the detected environment.

## Developer-Friendly Features

### Hot Reload for Rapid Prototyping

Edit your code and see changes instantly—no manual rebuild:

**Development Mode:**

```bash
npm run dev
```

**What happens:**

1. ESBuild watches for file changes
2. Rebuilds in <5ms on save
3. Browser auto-refreshes with updates
4. Inline sourcemaps for debugging

**Pro tip**: Keep DevTools open (F12) to see compile status and errors in real-time.

### Cross-Platform Consistency

Write once, run everywhere:

- **Same codebase** for web, desktop, and mobile
- **Native APIs** via Capacitor plugins (when needed)
- **No platform-specific code** for basic UIs

### Accessibility by Default

Every feature includes accessibility support:

- **Semantic HTML**: Proper element types (`<button>`, `<nav>`, `<main>`)
- **ARIA Attributes**: Auto-set where needed (e.g., `aria-pressed` for toggles)
- **Keyboard Navigation**: Full keyboard support, logical tab order
- **Screen Reader**: Clear labels and roles

**Testing accessibility**: Use browser DevTools Accessibility Inspector or screen readers (NVDA, JAWS, VoiceOver).

## Performance Features

### Lightning-Fast Builds

- **Development**: <5ms rebuild on file change
- **Production**: <10ms minified build
- **Bundle Size**: 1KB minified JS (your code), ~64KB total with docs

### Minimal Dependencies

Pure vanilla TypeScript and native browser APIs:

- **No React/Vue/Angular**: Just standard DOM manipulation
- **No jQuery**: `querySelector` and native methods
- **No utility libraries**: Custom implementations where needed

**Why?** Frameworks add bloat and drift over time. Standards endure.

## Extending Features

Want to add more? See:

- **[API Documentation](API.md)** - Programmatic customization
- **[Developer Guide](DeveloperGuide.md)** - Build your own components
- **[Contributing](Contributing.md)** - Share your improvements

## Platform-Specific Features

### Desktop (Electron)

- **Native menus**: File, Edit, View menus
- **System tray**: Background operation
- **Auto-updates**: Built-in update checking (configure in `electron-builder.json`)

### Mobile (Capacitor)

- **Native plugins**: Camera, geolocation, notifications (add as needed)
- **Offline support**: Works without internet (static assets)
- **App store ready**: Generate signed APK/IPA for distribution

## Coming Soon

Features under consideration (contribute ideas via GitHub Issues):

- Modal dialogs with ARIA support
- Context-aware toggles (state-based labels)
- Drag-and-drop file handling
- Canvas-based visualizations

---

**Next**: Check [API Documentation](API.md) for customization options or [Troubleshooting](Troubleshooting.md) if you encounter issues.

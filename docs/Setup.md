# Setup Guide

Welcome to your cross-platform TypeScript journey. Like building a foundation—start simple, extend with purpose.

## Prerequisites

You'll need these tools before diving in:

- **Node.js 20+** and npm (the backbone)
- **Git** (for version control)
- **Java 17+** and Android SDK (for mobile builds)
- **Xcode** (Mac only, for iOS builds)

## Quick Start

### 1. Clone or Use Template

```bash
# If using as template, click "Use this template" on GitHub
# Or clone directly:
git clone <your-repo-url>
cd template-cross-platform-app
```

### 2. Install Dependencies

```bash
npm install
```

This pulls in ESBuild, TypeScript, Electron, Capacitor, ESLint—everything needed. No bloat, just essentials. Like packing light for a long journey.

### 3. Start Development Server

```bash
npm run dev
```

Your app launches at `http://localhost:3000`. The dev server watches for changes, hot-reloads instantly (inline sourcemaps for debugging). It's truth-seeking in real-time—see changes as you type, no waiting.

### 4. Your First GUI Tweak

Open `src/index.ts`. Find the `App` class. Try changing the button text:

```typescript
// In src/index.html, locate:
<button id="clickButton" class="button">Click Me!</button>

// Change to:
<button id="clickButton" class="button">Begin Journey</button>
```

Save. Watch the browser refresh instantly. That's the flow—edit, see, iterate. Like Polaroid truth: immediate, unmanipulated feedback.

## System Requirements

- **Disk Space**: ~200MB for dependencies, <50KB for built app
- **Memory**: 2GB+ recommended for dev server
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)

## Next Steps

- Read [Build.md](Build.md) for platform-specific builds
- Check [Troubleshooting.md](Troubleshooting.md) if issues arise
- Review [CODE_GUIDELINES.md](../CODE_GUIDELINES.md) before coding

Remember: Start with clarity, build with intention. Avoid over-complication—it's the enemy of truth.

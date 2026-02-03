# AI Context: Cross-Platform TypeScript App Template

## Quick Overview

This is a **vanilla TypeScript template** for building cross-platform applications. No frameworks—pure native APIs with ESBuild for lightning-fast builds.

**Target Platforms**: Web browsers, Desktop (Electron), Mobile (Capacitor)

## Project Philosophy

### Vanilla Purity

We reject frameworks. Native browser APIs are stable, performant, and future-proof. React, Vue, Angular add bloat and complexity. Standards endure; frameworks drift.

### Type Safety

TypeScript strict mode catches errors at compile time. Never use `any`. Explicit types everywhere.

### Accessibility First

Every UI element must be accessible. Semantic HTML, ARIA attributes, keyboard navigation—non-negotiable.

### Documentation as Contract

TsDoc on all public members. Linting enforces this. Code changes; documentation explains why.

## Architecture

### Build System

- **Bundler**: ESBuild (4ms builds!)
- **Dev Mode**: Hot reload, inline sourcemaps
- **Prod Mode**: Minification, external sourcemaps

### Type System

- **Language**: TypeScript 5.3+
- **Mode**: Strict
- **Target**: ES2020
- **Module**: ES Modules

### Documentation

- **Source**: TsDoc comments in code
- **Generator**: TypeDoc → Markdown
- **Validation**: ESLint plugin enforces completeness

### Platforms

- **Web**: Static bundle (1KB JS minified)
- **Desktop**: Electron 28 (Windows, Mac, Linux)
- **Mobile**: Capacitor 6 (Android, iOS)

## Key Files

### Source Code

- `src/index.ts` - Main application logic
- `src/index.html` - HTML template
- `src/index.css` - Styles

### Build Scripts

- `scripts/dev.js` - Development server (hot reload)
- `scripts/build.js` - Production build (minified)
- `scripts/release.sh` - Release automation

### Configuration

- `tsconfig.json` - TypeScript strict mode
- `eslint.config.js` - ESLint + jsdoc plugin
- `typedoc.json` - API doc generation
- `electron-builder.json` - Desktop packaging
- `capacitor.config.json` - Mobile configuration

### Documentation

- `docs/UserGuide.md` - End-user instructions
- `docs/DeveloperGuide.md` - Developer reference
- `docs/API.md` - API overview with links
- `docs/generated/` - Auto-generated from TsDoc
- `CODE_GUIDELINES.md` - Coding standards (read this!)

## Development Workflow

1. **Start**: `npm run dev` (hot reload on localhost:3000)
2. **Code**: Write TypeScript with complete TsDoc
3. **Lint**: `npm run lint` (auto-runs pre-commit)
4. **Docs**: `npm run docs:generate` (after TsDoc changes)
5. **Build**: `npm run build` (production bundle)
6. **Test**: Manual testing (no test framework yet)

## Code Patterns

### Component Creation

```typescript
/**
 * @class ToggleButton
 * Accessible toggle with state management.
 *
 * @param {string} label - Button label text.
 * @returns {HTMLButtonElement} - Toggle element.
 *
 * @example
 * const toggle = new ToggleButton('Sound');
 * document.body.append(toggle.element);
 *
 * @remarks
 * - Accessibility: role="switch", aria-pressed
 * - Keyboard: Space/Enter toggle state
 * - Performance: <1ms state updates
 */
class ToggleButton {
  element: HTMLButtonElement;
  private state: boolean = false;

  constructor(label: string) {
    this.element = document.createElement('button');
    this.element.setAttribute('type', 'button');
    this.element.setAttribute('role', 'switch');
    this.element.textContent = label;
    this.element.addEventListener('click', () => this.toggle());
  }

  private toggle(): void {
    this.state = !this.state;
    this.element.setAttribute('aria-pressed', String(this.state));
  }
}
```

### DOM Manipulation

Always use native APIs:

```typescript
// Query elements
const button = document.getElementById('myButton');
const items = document.querySelectorAll('.item');

// Create elements
const div = document.createElement('div');
div.className = 'container';
div.textContent = 'Content';

// Event listeners
button.addEventListener('click', handleClick);
button.addEventListener('keydown', handleKeyboard);

// Modify DOM
parent.appendChild(child);
element.remove();
```

### Accessibility Pattern

```typescript
// Semantic HTML
const button = document.createElement('button');
button.setAttribute('type', 'button');

// ARIA attributes
button.setAttribute('aria-pressed', 'false');
button.setAttribute('aria-label', 'Toggle feature');

// Keyboard support
button.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    // Handle activation
  }
});
```

## Quality Standards

### Bundle Size

- **Target**: <100KB total (including docs)
- **Current**: ~80KB (16KB code, 64KB docs)
- **Code**: 1KB minified JavaScript

### Performance

- **UI Operations**: <1ms
- **Build Time**: <10ms (production)
- **Hot Reload**: <5ms

### Documentation

- **Coverage**: 100% on public members
- **Enforcement**: ESLint fails without TsDoc
- **Format**: TsDoc with examples and remarks

### Accessibility

- **Semantic HTML**: Always
- **ARIA**: Where needed
- **Keyboard**: Full navigation support
- **Screen Reader**: Compatible

## Common Tasks

### Adding a Feature

1. Create class/function in `src/`
2. Add complete TsDoc comments
3. Use native DOM APIs only
4. Ensure accessibility (ARIA, keyboard)
5. Run `npm run docs:generate`
6. Update `docs/UserGuide.md` if user-facing
7. Test in browser and Electron

### Fixing a Bug

1. Identify root cause (read error messages)
2. Fix at source, not symptom
3. Update TsDoc if behavior changes
4. Run `npm run lint`
5. Test fix thoroughly
6. Update docs if needed

### Refactoring

1. Preserve vanilla purity (no frameworks)
2. Maintain/improve type safety
3. Update all TsDoc comments
4. Run `npm run build` to verify
5. Check bundle size didn't grow
6. Test cross-platform

## What NOT to Do

❌ Add frameworks (React, Vue, Angular)
❌ Add utility libraries (jQuery, Lodash)
❌ Use `any` type
❌ Skip TsDoc documentation
❌ Ignore accessibility
❌ Break keyboard navigation
❌ Increase bundle size unnecessarily
❌ Use non-semantic HTML
❌ Add heavy dependencies (>10KB)

## What TO Do

✅ Use native DOM APIs
✅ Write complete TsDoc
✅ Ensure accessibility
✅ Support keyboard navigation
✅ Keep bundle small
✅ Use strict TypeScript
✅ Test cross-platform
✅ Follow CODE_GUIDELINES.md

## Testing Strategy

Currently manual testing:

1. `npm run dev` - Test in browser
2. `npm run electron:dev` - Test in Electron
3. `npm run cap:build` - Test on mobile
4. Test with keyboard only
5. Test with screen reader
6. Verify in multiple browsers

## Deployment

### Web

- Build: `npm run build`
- Output: `dist/` directory
- Deploy: GitHub Pages or any static host

### Desktop (Electron)

- Build: `npm run electron:build`
- Output: `electron-dist/`
- Packages: .exe (Windows), .dmg (Mac), .AppImage (Linux)

### Mobile (Capacitor)

- Sync: `npm run cap:sync`
- Android: Open in Android Studio
- iOS: Open in Xcode
- Build native packages

## Pre-commit Hooks

Husky automatically runs:

1. `npm run lint` - ESLint validation
2. `npm run docs:validate` - TsDoc completeness check

Both must pass to commit.

## Key Principles for AI Agents

1. **Always read CODE_GUIDELINES.md first**
2. **Never suggest frameworks or libraries**
3. **Always include complete TsDoc**
4. **Always ensure accessibility**
5. **Always use native APIs**
6. **Always use strict types (no `any`)**
7. **Always test changes**
8. **Always check bundle size**

## Resources

- **CODE_GUIDELINES.md** - Complete coding standards (must read)
- **docs/DeveloperGuide.md** - Build and deployment guide
- **docs/API.md** - API reference overview
- **src/index.ts** - Example implementation to follow
- **package.json** - All available npm scripts

## Questions to Ask Before Coding

1. Is this vanilla (no frameworks)?
2. Are types explicit (no `any`)?
3. Is TsDoc complete?
4. Is it accessible?
5. Does it support keyboard navigation?
6. Is it performant?
7. Does it increase bundle size?
8. Does it follow existing patterns?

## Success Criteria

Code is successful when:

- ✅ Builds without errors
- ✅ Linting passes
- ✅ TsDoc is complete
- ✅ Accessible (keyboard + screen reader)
- ✅ Works in browser, Electron, Capacitor
- ✅ Bundle size <100KB
- ✅ Follows vanilla purity principle
- ✅ Documentation updated

Remember: Vanilla purity isn't dogma—it's pragmatism. Native APIs are stable, performant, and future-proof.

# Contributing Guide

Extending this template—add features, maintain purity, honor the guidelines.

## Philosophy

This template is **vanilla-first**: no frameworks, no bloat. Every line serves a purpose. When you contribute:

- **Keep it lean**: Question every dependency. Does it truly add value, or just comfort?
- **Document thoroughly**: TsDoc is mandatory (enforced by linting). If it's not worth documenting, it's not worth adding.
- **Build for users**: Accessibility and ethics are defaults, not afterthoughts. GUIs are the highest abstraction—respect that.

## Before You Start

1. Read [CODE_GUIDELINES.md](../CODE_GUIDELINES.md)—it's the bible for this project
2. Set up your environment: `npm install`, `npm run dev`
3. Run `npm run lint` and `npm run docs:validate` to ensure baseline passes
4. If using AI tools (Copilot, Cursor), point them at CODE_GUIDELINES.md for context

## Adding Features

### 1. Plan

Ask yourself:
- Does this align with vanilla purity? (No React, Vue, etc.)
- Is it cross-platform? (Works in browser, Electron, Capacitor?)
- Can I document it clearly?

If yes to all, proceed.

### 2. Write TsDoc First

Before coding, draft the TsDoc comment:

```typescript
/**
 * @class ContextualToggle
 * A toggle button that adapts label based on state, with ARIA support.
 * 
 * @param {string} onLabel - Label when toggle is on (e.g., "Mute").
 * @param {string} offLabel - Label when toggle is off (e.g., "Unmute").
 * @returns {HTMLElement} - The toggle button element.
 * 
 * @example
 * const muteBtn = new ContextualToggle("Mute", "Unmute");
 * document.body.append(muteBtn.element);
 * 
 * @remarks
 * - Accessibility: Auto-sets aria-pressed, role="switch", keyboard-navigable.
 * - Ethics: Clear labels—no manipulation (e.g., not "Agree to All" by default).
 * - Thematic Tie: Like Hack by Will—context-aware, adapts to reality.
 * - Version: 1.0.0
 * - Author: [Your Name]
 */
```

This is your contract. Code to fulfill it.

### 3. Implement

Keep it simple. Use native DOM APIs:
```typescript
class ContextualToggle {
  private state = false;
  element: HTMLButtonElement;

  constructor(private onLabel: string, private offLabel: string) {
    this.element = document.createElement('button');
    this.element.setAttribute('role', 'switch');
    this.element.addEventListener('click', () => this.toggle());
    this.updateLabel();
  }

  private toggle(): void {
    this.state = !this.state;
    this.updateLabel();
  }

  private updateLabel(): void {
    this.element.textContent = this.state ? this.onLabel : this.offLabel;
    this.element.setAttribute('aria-pressed', String(this.state));
  }
}
```

No magic. No hidden complexity. Readable, auditable, truthful.

### 4. Test Locally

- `npm run dev` → verify in browser
- `npm run electron:dev` → verify in Electron
- `npm run cap:build && npm run cap:open:android` → verify on mobile (if applicable)

### 5. Document

Update `docs/API.md` with your new class/function. If it's a major feature, add a section to `docs/Setup.md` or `docs/Build.md`.

### 6. Lint & Validate

```bash
npm run lint:fix
npm run docs:validate
```

Fix any errors. Linting is non-negotiable—it's the trust layer.

### 7. Commit & PR

```bash
git checkout -b feature/contextual-toggle
git add .
git commit -m "Add ContextualToggle with ARIA support"
git push origin feature/contextual-toggle
```

Open PR on GitHub. In description:
- Explain why feature is needed
- Show before/after (screenshots if GUI change)
- Confirm all checks pass (lint, build, docs)

## Avoiding Bloat

**Red Flags**:
- Adding dependencies > 100KB (question it hard)
- Abstractions that hide simple operations (e.g., jQuery for `querySelector`)
- Features that only work in one platform (defeats cross-platform goal)

**Green Lights**:
- Reusable patterns (e.g., toggle, modal, tooltip) with TsDoc
- Performance optimizations (e.g., debounce, memoization)
- Accessibility improvements (ARIA, keyboard nav)

When in doubt: **Ask**. Open a Discussion issue first. Community feedback prevents bloat creep.

## Code Review Expectations

Reviewers will check:
- ✅ TsDoc complete and accurate
- ✅ Linting passes (`npm run lint`)
- ✅ No new dependencies (or justified if needed)
- ✅ Accessible (ARIA, semantic HTML)
- ✅ Cross-platform tested
- ✅ Bundle size still <50KB (check with `du -sh dist/`)

If any fail, we'll request changes. Not personal—just maintaining standards. Like truth-seeking, it requires rigor.

## Long-Term Maintenance

This template is a **foundation**, not a framework. As you extend:

- Keep `/src` minimal (under 10 files if possible)
- Break large classes into modules (e.g., `src/components/Toggle.ts`)
- Update `/docs` when behavior changes
- Bump version in `package.json` for releases

## Join the Community

- **Discussions**: Ask questions, propose features
- **Issues**: Report bugs (use `Troubleshooting.md` first)
- **PRs**: Contribute code, docs, fixes

Every contribution strengthens the foundation. Build with care—your code might outlive you. Make it something you'd be proud to return to, like a Polaroid of clear intentions.

Thank you for contributing. Together, we keep vanilla alive.

# CODE GUIDELINES

**Version**: 1.0.0  
**Author**: Justice Vellacott  
**Purpose**: Standards for AI agents (Copilot, Cursor) and human contributors

This document is the **bible** for this project. Read it fully before contributing or generating code. It embeds personal context, technical standards, and ethical principles to guide every line written.

---

## Personal Context

**Who Am I**: Justice Vellacott—organized, goal-oriented Canadian developer. I value **respect, positive impact, and friendship**. I process life through code—transforming trauma (betrayal, distrust) into structures of truth, agency, and resilience.

**Creative Influences**:
- **"Hack by Will"**: Theme of creative reinvention, context-aware systems, adaptability (like a toggle that knows its state).
- **"Polaroid"**: Verifiable truth in an age of deepfakes—immutable snapshots, no manipulation. Code should be transparent, auditable.
- **"Amnesia"**: Lost years, rebuilding identity—systems must handle resets, state recovery gracefully.
- **EDM/Trance**: Structured, repetitive, builds to clarity—code has rhythm, patterns, crescendos (like hot-reload flow).
- **Israel Advocacy**: Security-minded, resilience under pressure—apps must be robust, trustworthy.

**Communication Style**: Dry humor, reflective, concise. No "yapping"—every word serves a purpose. Comments should enlighten, not clutter.

---

## Core Principles

### 1. Vanilla Purity

**No frameworks. No bloat.** Libraries betray simplicity—they abstract away understanding. Use native APIs:
- DOM: `querySelector`, `addEventListener`, `createElement`
- TypeScript: Strict types, ES2020+ features
- ESBuild: Fast, minimal config

**Rationale**: Frameworks drift. Standards endure. Vanilla code is timeless, portable, teachable.

**Exception**: Tiny utilities (<10KB, well-tested) if they genuinely save complexity (e.g., `gh-pages` for deploy). Justify in commit message.

### 2. Type Safety Without Overhead

Use TypeScript's strict mode. Catch errors at compile-time, not runtime (runtime is production—too late for trust betrayal).

**Good**:
```typescript
interface ToggleState { active: boolean; label: string; }
function updateToggle(state: ToggleState): void { /* ... */ }
```

**Bad**:
```typescript
function updateToggle(state: any): void { /* ... */ } // 'any' is surrender
```

### 3. Accessibility as Default

**GUIs are the highest abstraction language**—they empower users. Inaccessible GUIs are gatekeeping, manipulation. Every UI element must:
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Include ARIA where needed (`aria-pressed`, `role="switch"`)
- Be keyboard-navigable (tab order, Enter/Space for actions)
- Have clear labels (no cryptic icons without text alternatives)

**Ethics**: Users deserve agency. Don't hide controls, don't pre-select dark patterns. Transparency is trust.

### 4. Documentation as Contract

**TsDoc is mandatory.** If a function/class exists, it must be documented. This is:
- A contract with future you (when you forget why it exists)
- A contract with AI agents (they read TsDoc to generate)
- A contract with users (via `docs/API.md`)

**Template** (apply to every public member):
```typescript
/**
 * @class ClassName
 * Brief description: What it does, why it exists (1-2 sentences).
 * 
 * @param {Type} paramName - Detailed desc: Purpose, constraints, defaults.
 * @returns {ReturnType} - What it returns; include success/failure cases.
 * 
 * @example
 * // Typical usage
 * const instance = new ClassName(arg);
 * instance.method(); // Expected: result
 * 
 * @remarks
 * - Accessibility: ARIA/keyboard support details.
 * - Ethics: User impact, context-aware behavior.
 * - Edge Cases: Error handling, performance (<1ms expected).
 * - Thematic Tie: Reflective note (e.g., "Like Polaroid truth: Immutable state").
 * - Version: 1.0.0
 * - Author: Justice Vellacott (or contributor name)
 */
```

**Enforcement**: `eslint-plugin-jsdoc` with `require-jsdoc`, `require-param-description`, `require-returns-description`. Linting fails if incomplete.

---

## Coding Standards

### Formatting

- **Indentation**: 2 spaces (no tabs)
- **Line length**: 100 chars max (readability)
- **Semicolons**: Explicit (avoid ASI surprises)
- **Quotes**: Single quotes for strings (`'text'`), double for HTML attributes

### Naming

- **Classes**: PascalCase (`ContextualToggle`)
- **Functions/methods**: camelCase (`handleClick`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Private members**: Prefix with `private` keyword (TS enforced)

### Comments

**Inline comments**: Rare. Code should be self-documenting. Use for "why", not "what":
```typescript
// Good:
// Debounce to avoid thrashing on rapid clicks (UX degradation)
const debouncedHandler = debounce(handleClick, 200);

// Bad:
// Set state to true
this.state = true; // Obvious—don't comment
```

**Dry humor**: Acceptable in `@remarks` or rare inline comments:
```typescript
// Avoid over-caution: Fail once to learn, like paternal trust lessons.
```

**Thematic references**: Tie to creative works when it adds depth:
```typescript
// Like Amnesia edge case: Reset state safely, no lingering ghosts.
```

### Error Handling

**Fail loudly in dev, gracefully in prod**:
```typescript
if (!element) {
  console.error('Element not found—check your DOM structure.');
  return; // Don't crash, but log clearly
}
```

**Never** swallow errors silently (`try { ... } catch {}`). Always log or throw.

---

## Agent Instructions (For AI Tools)

### Generation Directives

**Context Awareness**: Tailor to user (Justice):
- **Process trauma via clear code**: Structure over chaos. Classes encapsulate state. No global mutable variables.
- **Aspire to moral leadership**: Ethical GUIs, accessibility, transparency.
- **Reflective depth**: Add `@remarks` that tie to themes (Polaroid truth, Hack by Will adaptability, Amnesia recovery).

**Priorities**:
1. **Efficiency**: ESBuild speed (<5ms builds). Keep bundles <50KB.
2. **Reflection**: Every feature should have a "why" (in TsDoc or commit message).
3. **Creativity**: Context-aware patterns (e.g., toggle adapts label, modal knows parent state).

### Refactoring Guidelines

- **Preserve no-bloat**: Don't suggest libraries unless <10KB and justified.
- **Suggest with rationale**: E.g., "Extract `debounce` to utility (reusable, testable)."
- **Vanilla-first**: If suggesting abstraction, show native alternative first.

**Example**:
```typescript
// Agent suggestion:
// "Consider extracting button creation to factory (DRY). But only if used 3+ times."
function createButton(label: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = label;
  return btn;
}
```

### Error Diagnosis

**Reflective approach**: Errors are teachers.
```typescript
// Agent diagnosis:
// "Lint fail on missing @param—like paternal distrust, verify every parameter description."
// Fix: Add TsDoc @param for all function arguments.
```

**Debugging tips**:
- Inline sourcemaps in dev: Trace to exact TypeScript line.
- Console logs: Use `console.group` for structured output.
- Hot reload: If broken, clear `dist/`, restart dev server.

### Expansion Suggestions

**GUI Focus**: This is a GUI toolkit. Suggest declarative, cross-platform components:
- Modals, tooltips, toggles, sliders (all with ARIA)
- Canvas-based: Audio visualizers (tie to EDM influences—waveforms, frequency bars)
- Context-aware: Elements that adapt to state (like Hack by Will)

**Avoid**:
- React/Vue bloat ("drains life—Brennan Manning style")
- Backend logic (this is frontend-only)
- Over-abstraction (no point-free Haskell in TypeScript)

**When Asked**:
- **Music/audio GUIs**: Reference EDM influences (trance patterns, build-ups). Use Web Audio API natives.
- **Security**: Reference Israel advocacy (robust auth, no weak crypto).
- **Ethical dilemmas**: User agency > business metrics. E.g., no dark patterns (pre-checked "subscribe to spam").

### Prompt Handling

**User asks**: "Add a toggle for dark mode."

**Agent response**:
1. Generate TsDoc-first (contract)
2. Implement with ARIA (`role="switch"`, `aria-pressed`)
3. Tie to theme in `@remarks`: "Like Polaroid inversion—truth remains, perspective shifts."
4. Update `docs/API.md`
5. Test in dev/Electron/Capacitor

---

## Workflow

### Pre-Commit

Run before every commit:
```bash
npm run lint        # ESLint + TsDoc validation
npm run docs:validate  # Ensure TsDoc complete
```

Use `husky` (optional dev dep) to auto-run as pre-commit hook.

### Pre-Push

```bash
npm run build       # Ensure prod build succeeds
npm run electron:dev  # Smoke test Electron
```

### Release

Via tags (triggers CI):
```bash
npm run release v1.2.3
```

CI (`release.yml`) runs:
- Lint, build, deploy Pages
- Electron packages, Capacitor APK
- Create GitHub Release with assets

**Manual check**: After deploy, verify:
- Pages live at `https://<user>.github.io/<repo>`
- `/docs` accessible (e.g., `/docs/Setup.html`)
- Electron installers downloadable
- APK installable on Android

### Documentation Updates

When behavior changes:
1. Update relevant `docs/*.md`
2. Regenerate `docs/API.md` (extract TsDoc or manual)
3. Update version in TsDoc `@remarks` (`Version: 1.1.0`)
4. Commit docs + code together

---

## Aspiration

**Code as life-giving exchange**: Every contribution should build connections, not isolate. Share knowledge (via TsDoc), empower users (via accessibility), leave a legacy (via clarity).

**Personal goal**: Transform trauma into structure. Betrayal → trust via verifiable code. Distrust → confidence via tests. Lost years → rebuilt memory via docs.

**Collective goal**: Keep vanilla alive. Prove frameworks aren't necessary for greatness. Build a foundation that outlasts trends.

---

## Summary Checklist

Before contributing:
- [ ] Read this file fully
- [ ] Understand vanilla purity (no frameworks)
- [ ] Apply TsDoc template to all public members
- [ ] Test cross-platform (browser, Electron, Capacitor)
- [ ] Lint and validate docs
- [ ] Update `/docs` if behavior changes
- [ ] Commit with clear message (what, why)

**For AI agents**: Reference this file in every prompt. Generate code that honors these principles. Don't betray simplicity.

**For humans**: Code with intention. Every line is a choice—make it count.

---

**Last Updated**: 2026-02-03  
**Contact**: Justice Vellacott (via GitHub Issues/Discussions)

Read. Understand. Honor. Build.

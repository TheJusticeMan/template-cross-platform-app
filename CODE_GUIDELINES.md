# CODE GUIDELINES

**Version**: 1.0.0  
**Purpose**: Standards for AI agents and human contributors

This document establishes coding standards, documentation requirements, and best practices for maintaining code quality.

---

## Core Principles

### 1. Vanilla Purity

**No frameworks or unnecessary dependencies.** Use native browser APIs:

- DOM: `querySelector`, `addEventListener`, `createElement`
- TypeScript: Strict types, ES2020+ features
- ESBuild: Fast, minimal configuration

**Rationale**: Frameworks add complexity and drift over time. Native standards are stable, performant, and portable.

**Exception**: Small, well-tested utilities (<10KB) if they provide clear value. Justify in commit message.

### 2. Type Safety Without Overhead

Use TypeScript's strict mode. Catch errors at compile-time:

```typescript
// Good: Explicit types
interface ComponentState {
  active: boolean;
  label: string;
}
function updateComponent(state: ComponentState): void {
  /* ... */
}

// Avoid: Any types surrender type safety
function updateComponent(state: any): void {
  /* ... */
}
```

### 3. Accessibility as Default

**All UI must be accessible.** This is non-negotiable:

- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Include ARIA attributes where needed (`aria-pressed`, `role="switch"`)
- Support keyboard navigation (Tab, Enter/Space)
- Provide clear labels (no cryptic icons without text alternatives)

**Ethics**: Accessible UIs empower all users. Inaccessible UIs exclude and frustrate.

### 4. Documentation as Contract

**TsDoc is mandatory** on all public classes, functions, methods, and interfaces:

```typescript
/**
 * @class ComponentName
 * Brief description of purpose and behavior.
 *
 * @param {Type} paramName - Parameter description with constraints.
 * @returns {ReturnType} - Return value description.
 *
 * @example
 * const component = new ComponentName(arg);
 * component.method();
 *
 * @remarks
 * - Accessibility: ARIA support details
 * - Performance: Benchmark information (<1ms expected)
 * - Edge Cases: Error handling approach
 */
```

**Enforcement**: `eslint-plugin-jsdoc` validates completeness. Linting fails if documentation is missing or incomplete.

---

## Coding Standards

### Formatting

- **Indentation**: 2 spaces (no tabs)
- **Line length**: 100 characters maximum
- **Semicolons**: Required (avoid ASI issues)
- **Quotes**: Single quotes for strings (`'text'`), double for HTML attributes

### Naming Conventions

- **Classes**: PascalCase (`ContextualToggle`)
- **Functions/methods**: camelCase (`handleClick`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Private members**: Use TypeScript `private` keyword

### Comments

**Inline comments are rare.** Code should be self-documenting. Use comments for "why", not "what":

```typescript
// Good: Explains reasoning
// Debounce to prevent rapid clicks causing UI thrashing
const debouncedHandler = debounce(handleClick, 200);

// Avoid: States the obvious
// Set state to true
this.state = true;
```

### Error Handling

**Fail clearly in development, gracefully in production**:

```typescript
if (!element) {
  console.error('Element not found. Check DOM structure.');
  return; // Don't crash, but log clearly
}
```

**Never** silently swallow errors (`try { } catch {}`). Always log or throw.

---

## Agent Instructions (For AI Tools)

### Code Generation

When generating code:

1. **Follow TsDoc template** - All public members must be documented
2. **Use vanilla APIs** - No framework dependencies
3. **Prioritize accessibility** - Semantic HTML, ARIA, keyboard support
4. **Keep it minimal** - Question every line, remove unused code
5. **Type everything** - Strict TypeScript, no `any`

### Refactoring

When refactoring existing code:

1. **Preserve vanilla purity** - Don't suggest framework dependencies
2. **Maintain documentation** - Update TsDoc if behavior changes
3. **Test cross-platform** - Verify in browser, Electron, Capacitor
4. **Check bundle size** - Keep total <80KB

### Error Diagnosis

When diagnosing errors:

1. **Read error messages carefully** - They usually indicate the problem
2. **Check logs** - Console, terminal, build output
3. **Verify environment** - Node version, dependencies installed
4. **Trace systematically** - Follow execution path, isolate cause

### Feature Extensions

When adding features:

1. **Start with TsDoc** - Define the API before implementing
2. **Build accessibility in** - Not as an afterthought
3. **Keep performance high** - <1ms for UI operations
4. **Update documentation** - User guides, developer guides, API docs

---

## Documentation Generation

### TsDoc to Markdown

TypeDoc auto-generates API documentation from TsDoc comments:

**Workflow**:

1. Write complete TsDoc in source files
2. Run `npm run docs:generate`
3. TypeDoc creates markdown in `docs/generated/`
4. Link generated docs in user/developer guides

**Validation**: `npm run docs:validate` checks TsDoc completeness and runs TypeDoc dry-run.

### Agent Guidelines for Documentation

**When generating code**:

- Ensure TsDoc is complete before suggesting implementation
- Include `@remarks` for accessibility, performance, edge cases
- Provide realistic `@example` blocks
- Update version number when changing behavior

**When updating docs**:

- Run `docs:generate` after code changes
- Update user guides if feature behavior changes
- Link generated API docs in appropriate guides
- Commit code + docs together

---

## Workflow Standards

### Pre-Commit

Husky runs these checks automatically:

```bash
npm run lint          # ESLint + TsDoc validation
npm run docs:validate # TsDoc completeness + TypeDoc dry-run
```

Fix errors before committing.

### Pre-Push

Before pushing to remote:

```bash
npm run build        # Verify production build succeeds
npm run electron:dev # Smoke test desktop app
```

### Release Process

Use tagged releases:

```bash
npm run release v1.2.3
```

This workflow:

1. Runs linting and validation
2. Generates documentation
3. Builds production bundle
4. Creates and pushes git tag
5. Triggers GitHub Actions for deployment

**GitHub Actions** then:

- Deploys to GitHub Pages
- Builds Electron packages
- Generates Capacitor APK
- Creates release with assets

---

## Project-Specific Guidelines

### Bundle Size

Keep total bundle under 80KB:

- Main JS: ~1KB minified
- With sourcemaps: ~7KB
- Documentation: ~30KB
- Total: <80KB

### Performance Targets

- UI operations: <1ms
- Build time (dev): <5ms
- Build time (prod): <10ms
- Hot reload: <1ms change detection

### Cross-Platform Testing

Test on all targets:

- **Browser**: Chrome, Firefox, Safari, Edge
- **Electron**: Windows, macOS, Linux
- **Capacitor**: Android, iOS

### Documentation Structure

**User-facing** (in `/docs`):

- `index.md` - Navigation hub
- `UserGuide.md` - App usage
- `Features.md` - Feature walkthroughs
- `API.md` - High-level API with links to generated docs
- `DeveloperGuide.md` - Build/deploy instructions
- `Troubleshooting.md` - Issue resolution
- `Contributing.md` - Contribution guidelines
- `Changelog.md` - Version history

**Generated** (in `/docs/generated`):

- Auto-created from TsDoc
- Per-class/function markdown
- Linked from API.md

---

## Summary Checklist

Before contributing:

- [ ] Read this file fully
- [ ] Understand vanilla purity principle
- [ ] Apply TsDoc template to all public members
- [ ] Test cross-platform
- [ ] Run `npm run lint && npm run docs:validate`
- [ ] Update user docs if behavior changes
- [ ] Generate API docs: `npm run docs:generate`
- [ ] Commit with clear message

**For AI agents**: Reference this file in every prompt. Generate code that honors these principles.

**For humans**: Code with intention. Every line is a choice.

---

**Last Updated**: 2026-02-03  
**Contact**: GitHub Issues/Discussions

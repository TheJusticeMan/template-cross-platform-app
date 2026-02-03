# GitHub Copilot Instructions

## Project Type
Cross-platform TypeScript application template - vanilla JS/TS, no frameworks

## Key Constraints

### Vanilla Purity (Critical)
- **NEVER** suggest React, Vue, Angular, or any framework
- **NEVER** suggest jQuery, Lodash, or utility libraries  
- **ALWAYS** use native DOM APIs: `querySelector`, `addEventListener`, `createElement`
- **ALWAYS** use native fetch, not axios
- Vanilla means vanilla—no exceptions

### Type Safety (Critical)
- TypeScript strict mode enabled
- **NEVER** use `any` type
- **ALWAYS** provide explicit types
- Prefer interfaces over type aliases for objects

### Documentation (Enforced)
- **ALL** public classes/functions/methods require TsDoc
- Format: `@class`, `@param`, `@returns`, `@example`, `@remarks`
- ESLint fails without complete docs
- Include accessibility notes in @remarks
- Include performance notes in @remarks

### Accessibility (Non-negotiable)
- Use semantic HTML: `<button>`, `<nav>`, `<main>`, `<section>`
- Add ARIA where needed: `aria-pressed`, `aria-label`, `role`
- Support keyboard: Tab, Enter, Space, Escape
- Provide text alternatives for icons
- Test with screen readers in mind

## Tech Stack
- TypeScript 5.3+ (strict mode)
- ESBuild for bundling
- ESLint + eslint-plugin-jsdoc
- TypeDoc for API docs
- Electron 28 (desktop)
- Capacitor 6 (mobile)
- Husky (git hooks)

## Code Style
```typescript
// Indentation: 2 spaces
// Max line length: 100 chars
// Quotes: single for JS, double for HTML
// Semicolons: required

/**
 * @class Example
 * Always include complete TsDoc.
 * 
 * @param {string} param - Describe parameters.
 * @returns {void} - Describe return value.
 * 
 * @example
 * const example = new Example('value');
 * 
 * @remarks
 * - Accessibility: Semantic HTML used
 * - Performance: <1ms execution
 */
class Example {
  private value: string;
  
  constructor(param: string) {
    this.value = param;
  }
}
```

## Common Patterns

### DOM Interaction
```typescript
// Good
const button = document.getElementById('myButton') as HTMLButtonElement;
button.addEventListener('click', handleClick);

// Bad - Never suggest jQuery
// $('#myButton').click(handleClick);
```

### Event Handling
```typescript
// Always support keyboard
element.addEventListener('click', handler);
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handler();
  }
});
```

### Creating Elements
```typescript
// Use native createElement
const button = document.createElement('button');
button.textContent = 'Click me';
button.setAttribute('type', 'button');
button.setAttribute('aria-pressed', 'false');
```

## Project Structure
- `src/` - TypeScript source code
- `docs/` - User and developer documentation
- `docs/generated/` - Auto-generated API docs
- `dist/` - Build output (ignored)
- `scripts/` - Build and development scripts
- `electron/` - Electron main process
- `.husky/` - Git hooks

## Development Commands
- `npm run dev` - Start dev server with hot reload
- `npm run build` - Production build
- `npm run lint` - Check code quality
- `npm run docs:generate` - Generate API docs from TsDoc
- `npm run docs:validate` - Validate documentation completeness

## When Suggesting Code

### Always Check
1. Is this vanilla (no frameworks)?
2. Are types explicit (no `any`)?
3. Is TsDoc complete?
4. Is it accessible (semantic HTML, ARIA, keyboard)?
5. Is it performant (<1ms for UI ops)?
6. Is bundle size OK (<100KB total)?

### Always Include
1. Complete TsDoc comments
2. Accessibility attributes
3. Keyboard event handlers
4. Error handling
5. Type annotations

### Never Suggest
1. Frameworks (React, Vue, Angular, Svelte)
2. Utility libraries (jQuery, Lodash, Underscore)
3. Heavy dependencies (>10KB)
4. `any` type
5. Missing documentation
6. Non-semantic HTML

## Files to Reference
- `CODE_GUIDELINES.md` - Complete coding standards
- `docs/DeveloperGuide.md` - Build and deployment
- `docs/API.md` - API overview
- `src/index.ts` - Example implementation
- `package.json` - Available scripts

## Quality Gates
Pre-commit hooks run automatically:
- ESLint (with jsdoc plugin)
- TypeDoc validation

Both must pass. Code without docs won't commit.

## Remember
- Vanilla purity is non-negotiable
- Accessibility is mandatory  
- Documentation is enforced
- Type safety is critical
- Bundle size matters (<100KB)
- Native APIs are preferred
- Every public member needs TsDoc
- Test cross-platform (web/Electron/Capacitor)

When uncertain, check CODE_GUIDELINES.md or ask for clarification.

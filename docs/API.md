# API Documentation

Auto-generated overview of public classes, functions, and interfaces. This file is scaffolded from TsDoc comments in the codebase.

> **Note**: To regenerate this file, run `npm run docs:generate` (requires TypeDoc as optional dev dependency, or manually extract from source).

## Classes

### `App`

Main application class. Manages UI state, event handlers, and environment detection.

**Constructor**: `new App()`
- Initializes the application
- Sets up DOM event listeners
- Detects runtime environment (browser/Electron/Capacitor)

**Methods**:

#### `private init(): void`
Waits for DOM to load, then calls `setup()`. Like patience before truth—don't rush the foundation.

#### `private setup(): void`
Grabs button/counter elements from DOM, attaches click handler, logs environment.

#### `private handleClick(): void`
Increments click count, updates UI, animates button. Simple cause-effect—no hidden side effects.

**Parameters**: None
**Returns**: void
**Accessibility**: Button click is keyboard-accessible (native HTML behavior).

#### `private updateCounter(): void`
Sets counter text to current click count. Pure display logic.

**Parameters**: None
**Returns**: void

#### `private animateButton(): void`
Scales button down briefly (0.95) for tactile feedback. Resets after 100ms.

**Parameters**: None
**Returns**: void
**Performance**: <1ms, no layout thrashing (transform is GPU-accelerated).

#### `private logEnvironment(): void`
Detects if running in Electron, Capacitor, or browser via user-agent and global objects. Logs to console.

**Parameters**: None
**Returns**: void
**Ethics**: Transparent logging—no hidden tracking, just environment awareness.

**Properties**:
- `clickCount: number` - Private state, zero-initialized
- `button: HTMLElement | null` - Reference to button DOM node
- `counter: HTMLElement | null` - Reference to counter display node

## Interfaces

_(None defined yet. Add your own as you extend the app—document with TsDoc!)_

## Types

_(None defined yet. TypeScript primitives used directly. Define custom types as complexity grows, always with TsDoc.)_

## Functions (Top-Level)

_(None exported yet. Classes encapsulate logic. If you add utility functions, document them here.)_

---

## Adding to This API

When you create new classes/functions:

1. Write TsDoc comments (see [CODE_GUIDELINES.md](../CODE_GUIDELINES.md))
2. Run `npm run docs:validate` to ensure compliance
3. Update this file (manually or via TypeDoc)
4. Commit both code and `API.md` together

Keep it lean. Every public member should justify its existence. If it's complex, explain why in `@remarks`. If it's simple, be brief—clarity over verbosity.

API is a contract. Make it trustworthy, like Polaroid truth—no deception, just what it does.

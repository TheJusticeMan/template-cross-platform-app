# API Documentation

High-level API overview for customizing and extending the application. This guide is for power users and developers.

## For Power Users

The application provides simple, accessible ways to customize behavior without writing code:

### Configuration

Edit `src/index.html` to change UI text and structure:

```html
<!-- Change button label -->
<button id="clickButton" class="button">Start Counting</button>

<!-- Change page title -->
<title>My Custom App</title>
```

Edit `src/index.css` to customize appearance:

```css
/* Change button colors */
.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Adjust layout */
.container {
  max-width: 1200px; /* Wider layout */
}
```

### Accessibility Features

All components include built-in accessibility:

- **Keyboard Navigation**: Tab between elements, Enter/Space to activate
- **Screen Reader Support**: Semantic HTML and ARIA attributes
- **High Contrast**: Works with system high-contrast modes
- **Responsive**: Adapts to different screen sizes

**Testing**: Use browser DevTools Accessibility Inspector or screen readers (NVDA, JAWS, VoiceOver).

## For Developers

### Core Classes

The application is built with documented TypeScript classes. See auto-generated technical documentation:

**[Full API Reference →](generated/README.md)**

### Main Application Class

The `App` class manages application state and UI interactions:

```typescript
/**
 * Main application class managing UI state, event handlers,
 * and cross-platform environment detection.
 */
class App {
  constructor();
  // Initializes app, sets up event listeners
}
```

**Key Methods:**
- `init()`: Waits for DOM ready, then calls setup
- `setup()`: Grabs DOM elements, attaches event handlers
- `handleClick()`: Increments counter, updates UI
- `logEnvironment()`: Detects runtime (browser/Electron/Capacitor)

**Full details**: See [generated/classes/App.md](generated/classes/App.md) for complete API documentation including parameters, return types, and examples.

### Environment Detection

Detect runtime environment for conditional features:

```typescript
const isElectron = navigator.userAgent.toLowerCase().includes('electron');
const isCapacitor = !!(window as Window & { Capacitor?: unknown }).Capacitor;

if (isElectron) {
  // Desktop-specific features
} else if (isCapacitor) {
  // Mobile-specific features
} else {
  // Web-specific features
}
```

### Creating Custom Components

**Step 1: Write TsDoc-Documented Code**

```typescript
/**
 * @class CustomToggle
 * Accessible toggle button with state-based labels.
 * 
 * @param {string} onLabel - Label when toggle is on.
 * @param {string} offLabel - Label when toggle is off.
 * @returns {HTMLButtonElement} - Toggle button element.
 * 
 * @example
 * const toggle = new CustomToggle("Mute", "Unmute");
 * document.body.append(toggle.element);
 * 
 * @remarks
 * - Accessibility: Auto-sets aria-pressed, role="switch"
 * - Keyboard: Supports Enter/Space activation
 * - Performance: <1ms state updates
 */
class CustomToggle {
  element: HTMLButtonElement;
  private state: boolean = false;
  
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

**Step 2: Generate Documentation**

```bash
npm run docs:generate
```

TypeDoc creates `docs/generated/classes/CustomToggle.md` automatically.

**Step 3: Use the Component**

```typescript
const muteToggle = new CustomToggle("Mute", "Unmute");
document.getElementById('controls')?.append(muteToggle.element);
```

### API Design Principles

All components follow these principles:

1. **Accessibility First**: ARIA attributes, semantic HTML, keyboard support
2. **Performance**: GPU-accelerated animations, minimal reflows, <1ms operations
3. **Type Safety**: Full TypeScript types, no `any`
4. **Documentation**: Complete TsDoc on all public members
5. **Vanilla**: No framework dependencies, pure DOM APIs

### Advanced Topics

For extending the application:
- **State Management**: See how `App` class manages click counter state
- **Event Handling**: Native event listeners, no event libraries
- **DOM Manipulation**: `createElement`, `querySelector`, native APIs only
- **Cross-Platform**: Environment detection for conditional features

## Generated API Documentation

Complete technical reference auto-generated from code:

**[→ View Full API Reference](generated/README.md)**

Includes:
- Complete class documentation
- Method signatures with types
- Parameter descriptions
- Return value documentation
- Usage examples
- Accessibility and performance notes

## Next Steps

- **Users**: Return to [UserGuide](UserGuide.md) or [Features](Features.md)
- **Developers**: See [DeveloperGuide](DeveloperGuide.md) for build instructions
- **Contributors**: Read [Contributing](Contributing.md) for guidelines

---

**Note**: Documentation auto-updates when you run `npm run docs:generate`. Always run this after modifying TsDoc comments in code.

# DOM Extensions

Obsidian-style DOM utility extensions for vanilla TypeScript. Provides a clean, declarative API for element creation and styling without framework dependencies.

## Features

- **Element Creation**: `createEl`, `createDiv`, `createSpan`, `createSvg`
- **CSS Styling**: `setCssStyles`, `setCssProps`
- **Method Chaining**: All methods return elements for fluid API
- **Type Safety**: Full TypeScript support with proper generics
- **Zero Dependencies**: Pure vanilla JavaScript/TypeScript
- **Lightweight**: <3KB minified

## Installation

The extensions are already included in `src/dom-extensions.ts`. Import in your entry file:

```typescript
import './dom-extensions';
```

## API Reference

### Element Creation

#### `createEl(tag, options?, callback?)`

Creates a new HTML element with options and optional callback.

```typescript
// Simple creation
const button = document.body.createEl('button', {
  text: 'Click me',
  cls: 'primary-btn',
});

// With callback
const input = container.createEl(
  'input',
  {
    type: 'text',
    placeholder: 'Enter text',
  },
  (el) => {
    el.focus();
  }
);

// Callback only
const div = parent.createEl('div', (el) => {
  el.textContent = 'Dynamic content';
});
```

**Options:**

- `cls: string` - CSS class name(s)
- `text: string` - Text content
- `attr: Record<string, string>` - HTML attributes
- `title: string` - Title attribute (tooltip)
- `placeholder: string` - Placeholder (for inputs)
- `type: string` - Input type
- `value: string` - Initial value
- `parent: HTMLElement` - Auto-append to parent

#### `createDiv(options?, callback?)`

Convenience method for creating div elements.

```typescript
const card = document.body.createDiv({ cls: 'card' });
card.createDiv({ text: 'Card content' });
```

#### `createSpan(options?, callback?)`

Convenience method for creating span elements.

```typescript
const label = container.createSpan({ text: 'Label: ', cls: 'label' });
const value = label.createSpan({ text: 'Value' });
```

#### `createSvg(tag, options?, callback?)`

Creates SVG elements using proper namespace.

```typescript
const icon = document.body.createSvg('svg', {
  attr: {
    viewBox: '0 0 24 24',
    width: '24',
    height: '24',
  },
});

icon.createSvg('path', {
  attr: {
    d: 'M12 2L2 7v10l10 5 10-5V7L12 2z',
  },
});
```

### CSS Styling

#### `setCssStyles(styles)`

Applies multiple CSS styles via object. Returns element for chaining.

```typescript
element.setCssStyles({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
});
```

#### `setCssProps(props)`

Sets CSS custom properties (variables). Auto-prefixes with `--`.

```typescript
element.setCssProps({
  'primary-color': '#007bff',
  spacing: '1rem',
});
// Sets: --primary-color and --spacing

// Use in CSS
element.setCssStyles({
  color: 'var(--primary-color)',
  padding: 'var(--spacing)',
});
```

#### `setText(value?)`

Gets or sets text content. Chainable when setting.

```typescript
const text = element.getText(); // Get
element.setText('New text'); // Set
element.setText('Chain me').setCssStyles({ color: 'red' }); // Chain
```

## Method Chaining

All methods return elements, enabling fluent API:

```typescript
document.body
  .createDiv({ cls: 'container' })
  .setCssStyles({
    maxWidth: '1200px',
    margin: '0 auto',
  })
  .setCssProps({
    'theme-bg': '#ffffff',
  })
  .createEl('h1', { text: 'Title' })
  .setCssStyles({
    color: 'var(--theme-bg)',
  });
```

## Complete Examples

### Card Component

```typescript
const card = document.body.createDiv({ cls: 'card' }).setCssStyles({
  padding: '1.5rem',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
});

card.createEl('h2', { text: 'Card Title' });
card.createEl('p', { text: 'Card content here' });

card.createEl(
  'button',
  {
    text: 'Action',
    cls: 'btn-primary',
  },
  (btn) => {
    btn.addEventListener('click', () => alert('Clicked!'));
  }
);
```

### Form with Inputs

```typescript
const form = document.body.createEl('form', { cls: 'my-form' });

// Name field
const nameGroup = form.createDiv({ cls: 'form-group' });
nameGroup.createEl('label', {
  text: 'Name',
  attr: { for: 'name' },
});
nameGroup.createEl('input', {
  type: 'text',
  placeholder: 'Enter name',
  attr: { id: 'name', name: 'name' },
});

// Email field
const emailGroup = form.createDiv({ cls: 'form-group' });
emailGroup.createEl('label', {
  text: 'Email',
  attr: { for: 'email' },
});
emailGroup.createEl('input', {
  type: 'email',
  placeholder: 'your@email.com',
  attr: { id: 'email', name: 'email' },
});

// Submit
form.createEl('button', {
  text: 'Submit',
  attr: { type: 'submit' },
});
```

### Themed Component

```typescript
const themed = document.body
  .createDiv({ cls: 'themed' })
  .setCssProps({
    primary: '#6200ea',
    secondary: '#03dac6',
    bg: '#f5f5f5',
    radius: '8px',
  })
  .setCssStyles({
    backgroundColor: 'var(--bg)',
    borderRadius: 'var(--radius)',
    padding: '1rem',
    border: '2px solid var(--primary)',
  });

themed
  .createEl('h3', {
    text: 'Themed Component',
  })
  .setCssStyles({
    color: 'var(--primary)',
  });
```

### SVG Icon

```typescript
const checkIcon = document.body
  .createSvg('svg', {
    attr: {
      viewBox: '0 0 24 24',
      width: '24',
      height: '24',
      fill: 'currentColor',
    },
  })
  .setCssStyles({
    color: '#4caf50',
  });

checkIcon.createSvg('path', {
  attr: {
    d: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  },
});
```

## TypeScript Support

Full type definitions included. All methods are properly typed with generics:

```typescript
// Type inference works
const button: HTMLButtonElement = container.createEl('button');
const svg: SVGSVGElement = container.createSvg('svg');

// Options are typed
const input = form.createEl('input', {
  type: 'text', // Type: string
  placeholder: 'Enter text', // Type: string
  attr: { id: 'my-input' }, // Type: Record<string, string>
});
```

## Demo

See `src/dom-extensions-demo.ts` for comprehensive examples including:

- Card components
- Form creation
- SVG icons
- Themed components
- Status indicators
- Auto-appending with parent option

Run the demo:

```typescript
import { runAllDemos } from './dom-extensions-demo';
runAllDemos();
```

## Best Practices

### Accessibility

Use semantic HTML and ARIA attributes:

```typescript
button.createEl('button', {
  text: 'Toggle',
  cls: 'toggle-btn',
  attr: {
    type: 'button',
    'aria-pressed': 'false',
    'aria-label': 'Toggle panel',
  },
});
```

### Performance

Batch DOM operations when possible:

```typescript
// Good: Create structure, then append once
const fragment = document.createEl('div');
fragment.createDiv({ text: 'Item 1' });
fragment.createDiv({ text: 'Item 2' });
fragment.createDiv({ text: 'Item 3' });
document.body.appendChild(fragment);

// Avoid: Multiple individual appends in a loop
```

### Styling

Prefer CSS classes for complex styling:

```typescript
// Good: Use class
element.createDiv({ cls: 'card card-primary' });

// OK: Simple inline styles
element.createDiv().setCssStyles({
  display: 'flex',
  gap: '1rem',
});
```

## Browser Support

Works in all modern browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

Requires:

- ES2020 features
- DOM API
- TypeScript 5.0+ (for development)

## License

MIT License - Part of the vanilla TypeScript cross-platform app template.

## Credits

Inspired by [Obsidian](https://obsidian.md/) API design philosophy.

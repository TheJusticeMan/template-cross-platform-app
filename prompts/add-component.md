# Prompt: Add New Component

Use this prompt when you need to create a new UI component.

## Template

````
I need to create a new component called [ComponentName].

**Purpose**: [Brief description of what the component does]

**Requirements**:
- Use vanilla TypeScript (NO frameworks, NO libraries)
- Add complete TsDoc comments with @class, @param, @returns, @example, @remarks
- Ensure full accessibility:
  - Use semantic HTML elements
  - Add appropriate ARIA attributes
  - Support keyboard navigation (Tab, Enter, Space, Escape)
  - Provide text alternatives
- Keep code minimal and performant (<1ms operations)
- Follow patterns in src/index.ts
- Type safety: no `any` types

**Component Details**:
- HTML structure: [describe elements needed]
- Event handling: [describe interactions]
- State management: [describe state if any]
- Accessibility features: [specific ARIA roles/properties]

**Example Usage**:
```typescript
const component = new [ComponentName]([params]);
document.body.appendChild(component.element);
````

Please generate:

1. The component class with complete TsDoc
2. Example integration code
3. Notes on accessibility features
4. Any CSS that might be needed

Refer to CODE_GUIDELINES.md for standards.

```

## Example Filled Out

```

I need to create a new component called ModalDialog.

**Purpose**: A modal dialog for displaying messages with a close button

**Requirements**:

- Use vanilla TypeScript (NO frameworks, NO libraries)
- Add complete TsDoc comments with @class, @param, @returns, @example, @remarks
- Ensure full accessibility:
  - Use semantic HTML elements (dialog element)
  - Add appropriate ARIA attributes (role="dialog", aria-modal="true", aria-labelledby)
  - Support keyboard navigation (Escape to close, Tab trapping)
  - Provide text alternatives
- Keep code minimal and performant (<1ms operations)
- Follow patterns in src/index.ts
- Type safety: no `any` types

**Component Details**:

- HTML structure:
  - <dialog> element (semantic)
  - Title heading with ID
  - Content container
  - Close button
- Event handling:
  - Click on close button
  - Escape key to close
  - Click outside to close (optional)
- State management:
  - isOpen boolean
  - content string
- Accessibility features:
  - role="dialog"
  - aria-modal="true"
  - aria-labelledby pointing to title
  - Focus management (trap focus inside, return focus on close)

**Example Usage**:

```typescript
const modal = new ModalDialog('Confirm', 'Are you sure?');
modal.open();
```

Please generate:

1. The ModalDialog class with complete TsDoc
2. Example integration code
3. Notes on accessibility features
4. Any CSS that might be needed

Refer to CODE_GUIDELINES.md for standards.

````

## After Generation

1. Review the generated code for:
   - Vanilla purity (no frameworks)
   - Complete TsDoc
   - Accessibility features
   - Type safety
   - Performance

2. Test the component:
   - Visual testing in browser
   - Keyboard navigation
   - Screen reader (if possible)
   - Different browsers

3. Run quality checks:
   ```bash
   npm run lint
   npm run docs:generate
   npm run build
````

4. Update documentation:
   - Add to docs/API.md if public API
   - Update docs/Features.md if user-facing
   - Generate API docs: `npm run docs:generate`

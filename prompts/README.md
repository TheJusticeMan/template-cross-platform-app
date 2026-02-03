# AI Agent Prompts for Common Tasks

This directory contains prompt templates for common development tasks. These help AI coding assistants understand exactly what you need.

## Available Prompts

- **add-component.md** - Create a new UI component
- **fix-bug.md** - Debug and fix an issue
- **refactor-code.md** - Improve existing code
- **add-feature.md** - Implement a new feature
- **update-docs.md** - Update documentation
- **optimize-performance.md** - Improve performance

## How to Use

1. Open the relevant prompt file
2. Copy the template
3. Fill in the specifics for your task
4. Paste to your AI assistant (Cursor, Copilot, Claude, etc.)
5. Review the generated code carefully
6. Test thoroughly before committing

## Important Notes

- Always read CODE_GUIDELINES.md first
- AI suggestions must follow vanilla purity principle
- All code needs complete TsDoc
- Accessibility is mandatory
- Test cross-platform (web, Electron, Capacitor)

## General Prompt Template

When asking AI for help, include:

1. **Context**: What you're trying to accomplish
2. **Constraints**: Vanilla JS/TS, no frameworks, accessibility
3. **Requirements**: Complete TsDoc, keyboard support, ARIA
4. **Testing**: How you'll verify it works
5. **Documentation**: What docs need updating

Example:

```
I need to add a [component/feature].

Requirements:
- Use vanilla TypeScript (no frameworks)
- Add complete TsDoc comments
- Ensure accessibility (ARIA, keyboard navigation)
- Keep bundle size minimal
- Follow patterns in src/index.ts

Please generate the code following CODE_GUIDELINES.md.
```

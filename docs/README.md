# Documentation

Welcome to the Cross-Platform TypeScript App Template documentation.

## Quick Navigation

### Getting Started
- **[Setup.md](Setup.md)** - Installation and quick start guide
- **[Build.md](Build.md)** - Building for different platforms (web, desktop, mobile)
- **[Deploy.md](Deploy.md)** - Deployment and release process

### Reference
- **[API.md](API.md)** - Public API documentation (auto-generated from TsDoc)
- **[Troubleshooting.md](Troubleshooting.md)** - Common issues and solutions

### Contributing
- **[Contributing.md](Contributing.md)** - How to extend this template
- **[../CODE_GUIDELINES.md](../CODE_GUIDELINES.md)** - Coding standards and agent instructions

## Documentation Philosophy

This documentation is **bundled with builds** (in `dist/docs/`) for offline access in Electron and Capacitor apps. It's also deployed to GitHub Pages.

**Key Principles**:
- **User-friendly**: Step-by-step guides with clear examples
- **Reflective**: Ties technical concepts to broader themes (truth-seeking, agency, resilience)
- **Practical**: Focus on getting things done, not abstract theory
- **Accessible**: Works offline, mobile-friendly, clear language

## Viewing Locally

To preview documentation locally:

```bash
npm run docs:serve
```

Opens at `http://localhost:8001`

## Updating Documentation

When code behavior changes:

1. Update relevant `.md` files in `/docs`
2. Update `API.md` if public API changes (extract from TsDoc comments)
3. Run `npm run docs:validate` to ensure code still has complete TsDoc
4. Build to verify docs copy: `npm run build`
5. Commit code + docs together

**Remember**: Documentation is a contract. Keep it accurate, or it becomes betrayal (of future users, including yourself).

## Documentation as Offline Help

In Electron/Capacitor apps, users can access docs without internet:

```typescript
// Example: Link to offline docs in your app
const helpLink = document.createElement('a');
helpLink.href = 'docs/Setup.md'; // Relative path in dist/
helpLink.textContent = 'View Setup Guide';
```

This makes your app self-documenting—like Polaroid instructions that never fade.

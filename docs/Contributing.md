# Contributing Guide

Help improve the Cross-Platform TypeScript App. Contributions welcome from users and developers.

## For Users

### Report Bugs

Found a problem? Help us fix it:

1. **Check existing issues**: [GitHub Issues](https://github.com/TheJusticeMan/template-cross-platform-app/issues)
2. **Create new issue** with:
   - Clear title (e.g., "Button doesn't respond on mobile")
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if relevant
   - Your environment (OS, browser/app version)

### Suggest Features

Have an idea? Share it:

1. **Open discussion**: [GitHub Discussions](https://github.com/TheJusticeMan/template-cross-platform-app/discussions)
2. **Explain the use case**: Why is this needed?
3. **Consider accessibility**: Will it work for all users?

### Improve Documentation

Spot unclear docs or typos:

1. **Report**: Open issue with "docs:" prefix
2. **Or edit directly**: Submit pull request with fixes

## For Developers

### Before Contributing

1. **Read**: [CODE_GUIDELINES.md](../CODE_GUIDELINES.md) for coding standards
2. **Check**: [DeveloperGuide.md](DeveloperGuide.md) for build/test instructions
3. **Discuss**: Open issue before major changes

### Contribution Workflow

**1. Fork & Clone**

```bash
git clone https://github.com/your-username/template-cross-platform-app
cd template-cross-platform-app
npm install
```

**2. Create Branch**

```bash
git checkout -b feature/your-feature-name
```

**3. Make Changes**

- Follow existing code style
- Write TsDoc comments (mandatory)
- Keep changes focused

**4. Test Locally**

```bash
npm run lint          # Check code quality
npm run docs:validate # Validate documentation
npm run build         # Ensure builds successfully
npm run dev           # Test in browser
npm run electron:dev  # Test in Electron
```

**5. Generate Documentation**

```bash
npm run docs:generate
```

**6. Commit**

```bash
git add .
git commit -m "Add feature: descriptive message"
```

Pre-commit hooks will run lint and docs validation automatically.

**7. Push & Pull Request**

```bash
git push origin feature/your-feature-name
```

Open pull request on GitHub with:

- Clear description of changes
- Why it's needed
- Screenshots (if UI changes)
- Test results

### Code Standards

**Mandatory TsDoc**:

```typescript
/**
 * @class ComponentName
 * Brief description of purpose.
 *
 * @param {Type} paramName - Parameter description.
 * @returns {ReturnType} - Return value description.
 *
 * @example
 * const comp = new ComponentName(arg);
 *
 * @remarks
 * - Accessibility: ARIA support details
 * - Performance: Benchmark info
 */
```

**Vanilla Purity**:

- No frameworks (React, Vue, Angular)
- Native DOM APIs only
- No jQuery or utility libraries
- Justify any new dependencies

**Accessibility First**:

- Semantic HTML
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatible

### Documentation Updates

When code changes:

1. Update TsDoc comments in source
2. Run `npm run docs:generate` to update API docs
3. Update user guides if behavior changes
4. Commit code + docs together

### Code Review Expectations

Reviewers check:

- ✓ TsDoc complete and accurate
- ✓ Linting passes
- ✓ No new dependencies (or justified)
- ✓ Accessible (ARIA, keyboard, semantic HTML)
- ✓ Cross-platform tested
- ✓ Bundle size stays under limit

### Development Guidelines

**Keep it Minimal**:

- Question every line of code
- Remove unused code
- Avoid over-abstraction
- Clear > clever

**Performance Matters**:

- <1ms for UI operations
- GPU-accelerated animations
- Minimal DOM manipulation

**Accessibility Non-Negotiable**:

- Test with keyboard only
- Use screen reader
- Check DevTools Accessibility Inspector

### Project Structure

```
src/              # TypeScript source (document all exports)
docs/             # User-facing documentation
docs/generated/   # Auto-generated API docs
scripts/          # Build scripts
electron/         # Electron main process
```

### Getting Help

- **Questions**: [GitHub Discussions](https://github.com/TheJusticeMan/template-cross-platform-app/discussions)
- **Bugs**: [GitHub Issues](https://github.com/TheJusticeMan/template-cross-platform-app/issues)
- **Security**: See SECURITY.md

## License

By contributing, you agree your contributions will be licensed under MIT License.

---

**Thank you** for helping improve this project!

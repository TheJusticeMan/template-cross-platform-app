# Changelog

All notable changes to the Cross-Platform TypeScript App are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-03

### Added
- Initial release of cross-platform TypeScript application template
- ESBuild for development (hot reload, inline sourcemaps) and production (minify, external maps)
- ESLint with TypeScript and TsDoc enforcement via eslint-plugin-jsdoc
- Electron support for desktop applications (Windows, macOS, Linux)
- Capacitor support for mobile applications (Android, iOS)
- GitHub Actions workflow for automated releases
- Comprehensive documentation structure:
  - User-facing guides (UserGuide, Features, API)
  - Developer documentation (DeveloperGuide, Contributing)
  - Auto-generated API docs via TypeDoc
- Pre-commit hooks for code quality validation
- Accessibility-first approach (semantic HTML, ARIA, keyboard navigation)
- Bundle size: 1KB minified JS, <80KB total with documentation

### Technical
- TypeScript 5.3+ with strict mode
- ES2020 target for modern browser support
- Pure vanilla TypeScript/JavaScript (no frameworks)
- Cross-platform build scripts (Windows, macOS, Linux)

---

## Version History

### Unreleased
- Check [GitHub milestones](https://github.com/TheJusticeMan/template-cross-platform-app/milestones) for upcoming features

### How to Read This Changelog

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes

---

**Note**: This changelog can be auto-updated from git tags. Run `git log --oneline --decorate` to see commit history.

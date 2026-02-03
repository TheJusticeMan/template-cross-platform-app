# User Guide

Welcome to the Cross-Platform TypeScript App—a straightforward GUI tool for building interactive interfaces. No unnecessary complexity—just clear, accessible interaction.

## What Is This?

This application provides a foundation for creating cross-platform user interfaces that work in browsers, desktop applications (via Electron), and mobile devices (via Capacitor). It's designed for prototyping, building tools, and creating accessible GUIs without framework overhead.

## Getting Started

### Launching the Application

**In a Browser:**
1. Open `dist/index.html` in any modern browser
2. The interface loads instantly—no server required

**As Desktop App (Electron):**
1. Run the installer for your platform (`.dmg` for Mac, `.exe` for Windows, `.AppImage` for Linux)
2. Application appears in your Applications folder or Start Menu

**On Mobile (Capacitor):**
1. Install the APK (Android) or IPA (iOS) on your device
2. Launch from your app drawer

### Core Features

The application demonstrates fundamental GUI patterns:

- **Click Counter**: Interactive button with visual feedback
- **Environment Detection**: Automatically adapts to browser, desktop, or mobile
- **Hot Reload (Development)**: Edit code, see changes instantly—no manual refresh
- **Accessibility Support**: Keyboard navigation, semantic HTML, ARIA attributes built-in

### Basic Usage

1. **Interact with Elements**: Click the button to increment the counter
2. **Check Console**: Open browser DevTools (F12) to see environment detection logs
3. **Customize**: Edit `src/index.ts` to add your own UI elements

### Keyboard Navigation

All interactive elements support keyboard access:
- **Tab**: Move between elements
- **Enter/Space**: Activate buttons
- **Escape**: Close modals (when implemented)

## Power User Features

For advanced customization, see:
- **[API Documentation](API.md)** - Customize behavior programmatically
- **[Features Guide](Features.md)** - Detailed feature walkthrough

## Need Help?

- **[Troubleshooting](Troubleshooting.md)** - Common issues and solutions
- **[Report a Bug](https://github.com/TheJusticeMan/template-cross-platform-app/issues)** - File an issue on GitHub

## Next Steps

- Explore the [Features](Features.md) guide for detailed walkthroughs
- Check [API for Power Users](API.md) to customize the application
- Learn to build and deploy in the [Developer Guide](DeveloperGuide.md)

---

**Version**: 1.0.0  
**Platform**: Web, Desktop (Electron), Mobile (Capacitor)  
**License**: MIT

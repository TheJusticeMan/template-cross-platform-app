# Troubleshooting Guide

Systematic solutions for common issues. Follow the diagnostic steps carefully.

## For App Users

### Application Not Loading

**Symptom**: Blank screen or "Page not found" error.

**Check Browser Console**:

1. Open DevTools (F12 or right-click > Inspect)
2. Go to Console tab
3. Look for error messages (usually red text)

**Common Causes**:

- **File path issue**: If opening locally (file://), browser may block resources. Use a local server
- **Browser compatibility**: Use modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **JavaScript disabled**: Check browser settings, ensure JavaScript is enabled

### Button Not Responding

**Symptom**: Click counter button doesn't increment.

**Check**: Open Console (F12), click button, look for JavaScript errors

### Electron App Won't Launch

**Symptom**: Desktop app closes immediately after opening.

**Check**: Launch from Terminal to see error messages

### TypeDoc Generation Errors

**Symptom**: docs:generate fails

**Fix**: Run npm run lint to check TsDoc completeness, fix missing @param/@returns

## For Developers

See [DeveloperGuide](DeveloperGuide.md) for complete troubleshooting including hot reload, port conflicts, build failures, Electron issues, Capacitor issues, and deployment problems.

## Still Stuck?

1. Re-read documentation: UserGuide, DeveloperGuide
2. Check GitHub Issues
3. Ask for help with error messages and reproduction steps

---

**Debugging Philosophy**: Every error has a root cause. Trace it systematically.

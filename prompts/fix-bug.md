# Prompt: Fix Bug

Use this prompt when you need help debugging and fixing an issue.

## Template

```
I'm experiencing a bug in [location/component].

**Bug Description**:
[Clear description of what's wrong]

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Error Messages** (if any):
```

[Paste error messages here]

```

**Environment**:
- Platform: [Browser/Electron/Capacitor]
- Browser: [Chrome/Firefox/Safari/Edge]
- OS: [Windows/Mac/Linux]

**Code Location**:
[File path and line numbers if known]

**Requirements for Fix**:
- Maintain vanilla purity (no frameworks)
- Preserve or add TsDoc documentation
- Ensure accessibility isn't broken
- Test fix thoroughly
- Update documentation if behavior changes
- Follow CODE_GUIDELINES.md

Please help me:
1. Identify the root cause
2. Suggest a fix
3. Explain why it works
4. Provide test cases to verify
```

## Example Filled Out

```
I'm experiencing a bug in the click counter.

**Bug Description**:
The counter doesn't increment when clicking the button in Electron

**Expected Behavior**:
Counter should increment by 1 on each button click

**Actual Behavior**:
Counter stays at 0 in Electron, but works fine in browser

**Steps to Reproduce**:
1. Run `npm run electron:dev`
2. Click the "Click Me!" button
3. Observe counter stays at "Clicks: 0"

**Error Messages** (if any):
```

No errors in console

```

**Environment**:
- Platform: Electron
- Browser: N/A (Electron 28)
- OS: Windows 11

**Code Location**:
src/index.ts, handleClick() method around line 81

**Requirements for Fix**:
- Maintain vanilla purity (no frameworks)
- Preserve or add TsDoc documentation
- Ensure accessibility isn't broken
- Test fix thoroughly
- Update documentation if behavior changes
- Follow CODE_GUIDELINES.md

Please help me:
1. Identify the root cause
2. Suggest a fix
3. Explain why it works
4. Provide test cases to verify
```

## Debugging Checklist

Before asking for help, try:

1. **Read Error Messages Carefully**
   - Error messages usually point to the issue
   - Check line numbers
   - Look at stack traces

2. **Check Console**
   - Open DevTools (F12)
   - Look for errors or warnings
   - Check Network tab for failed requests

3. **Verify DOM Structure**
   - Are elements rendering?
   - Are IDs/classes correct?
   - Use Elements inspector

4. **Check Event Listeners**
   - Are listeners attached?
   - Are selectors correct?
   - Test with console logs

5. **Review Recent Changes**
   - What changed recently?
   - Check git diff
   - Revert and test

6. **Test Environment**
   - Does it work in browser?
   - Does it work in Electron?
   - Does it work on mobile?

## After Fix

1. **Verify Fix**:

   ```bash
   npm run dev          # Test in browser
   npm run electron:dev # Test in Electron
   ```

2. **Run Quality Checks**:

   ```bash
   npm run lint
   npm run build
   ```

3. **Test Edge Cases**:
   - Test with keyboard
   - Test rapid clicks
   - Test in different browsers
   - Test on different platforms

4. **Update Documentation**:
   - Add to docs/Troubleshooting.md if common issue
   - Update TsDoc if behavior changed
   - Add comments explaining tricky parts

5. **Prevent Recurrence**:
   - Add safeguards (null checks, validation)
   - Add comments explaining why
   - Consider adding to test suite

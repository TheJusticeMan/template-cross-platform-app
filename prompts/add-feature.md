# Prompt: Add Feature

Use this prompt when implementing a new feature.

## Template

```
I want to add a new feature: [Feature Name]

**Feature Description**:
[Clear description of what the feature does and why it's needed]

**User Story**:
As a [user type], I want to [action] so that [benefit].

**Requirements**:
- Use vanilla TypeScript (NO frameworks)
- Add complete TsDoc documentation
- Ensure full accessibility (ARIA, keyboard, semantic HTML)
- Maintain performance (<1ms operations)
- Keep bundle size minimal
- Follow patterns in src/index.ts
- Type safety: no `any` types

**Technical Details**:
- Files to modify: [list files]
- New files to create: [list files]
- DOM structure needed: [describe]
- Event handling: [describe interactions]
- State management: [describe state]

**User Interaction**:
1. [Step 1]
2. [Step 2]
3. [Expected outcome]

**Acceptance Criteria**:
- [ ] Feature works in browser
- [ ] Feature works in Electron
- [ ] Feature works in Capacitor
- [ ] Keyboard accessible
- [ ] Screen reader compatible
- [ ] Complete TsDoc added
- [ ] Documentation updated
- [ ] Linting passes
- [ ] Bundle size acceptable

Please provide:
1. Implementation code with TsDoc
2. Integration instructions
3. Testing checklist
4. Documentation updates needed
5. Any CSS required

Refer to CODE_GUIDELINES.md for standards.
```

## Example Filled Out

```
I want to add a new feature: Dark Mode Toggle

**Feature Description**:
Add a toggle button that switches between light and dark themes. The preference should persist using localStorage.

**User Story**:
As a user, I want to toggle between light and dark modes so that I can use the app comfortably in different lighting conditions.

**Requirements**:
- Use vanilla TypeScript (NO frameworks)
- Add complete TsDoc documentation
- Ensure full accessibility (ARIA, keyboard, semantic HTML)
- Maintain performance (<1ms theme switch)
- Keep bundle size minimal
- Follow patterns in src/index.ts
- Type safety: no `any` types

**Technical Details**:
- Files to modify: 
  - src/index.ts (add ThemeToggle class)
  - src/index.html (add toggle button)
  - src/index.css (add dark theme styles)
- New files to create: None
- DOM structure needed:
  - Button with role="switch"
  - aria-pressed to indicate state
  - Icon or text label
- Event handling:
  - Click to toggle
  - Space/Enter keyboard support
- State management:
  - theme: 'light' | 'dark'
  - Persist to localStorage
  - Apply on page load

**User Interaction**:
1. User clicks theme toggle button
2. Theme switches instantly
3. Preference saved to localStorage
4. Theme persists on page reload

**Acceptance Criteria**:
- [ ] Toggle works in browser
- [ ] Toggle works in Electron
- [ ] Toggle works in Capacitor
- [ ] Keyboard accessible (Space/Enter)
- [ ] Screen reader announces state
- [ ] Complete TsDoc added
- [ ] Documentation updated
- [ ] Linting passes
- [ ] Theme persists across sessions
- [ ] Bundle size <100KB

Please provide:
1. ThemeToggle class implementation with TsDoc
2. Integration code for index.ts
3. HTML for toggle button
4. CSS for dark theme
5. Testing checklist
6. Documentation updates for docs/Features.md

Refer to CODE_GUIDELINES.md for standards.
```

## Implementation Checklist

After receiving AI-generated code:

1. **Review Code**:
   - [ ] Uses vanilla TypeScript
   - [ ] No frameworks or libraries
   - [ ] Complete TsDoc present
   - [ ] Accessibility features included
   - [ ] Type-safe (no `any`)

2. **Test Functionality**:
   - [ ] Works as expected
   - [ ] Handles edge cases
   - [ ] Performs well
   - [ ] No console errors

3. **Test Accessibility**:
   - [ ] Keyboard navigation works
   - [ ] Tab order logical
   - [ ] Enter/Space activate
   - [ ] ARIA attributes correct
   - [ ] Screen reader friendly

4. **Run Quality Checks**:
   ```bash
   npm run lint
   npm run docs:generate
   npm run build
   ```

5. **Update Documentation**:
   - [ ] Update docs/Features.md
   - [ ] Update docs/UserGuide.md if needed
   - [ ] Generate API docs
   - [ ] Update README if major feature

6. **Test Cross-Platform**:
   - [ ] Browser (Chrome, Firefox, Safari, Edge)
   - [ ] Electron desktop
   - [ ] Capacitor mobile (if applicable)

7. **Verify Bundle**:
   ```bash
   npm run build
   du -sh dist/
   # Should be <100KB total
   ```

## After Implementation

1. Commit with clear message:
   ```bash
   git add .
   git commit -m "Add dark mode toggle feature

   - Added ThemeToggle class with accessibility
   - Persists theme preference to localStorage
   - Updated documentation and examples
   - Complete TsDoc documentation
   "
   ```

2. Update CHANGELOG:
   - Add entry for new feature
   - Note version number

3. Consider user impact:
   - Does this need a migration?
   - Should we announce it?
   - Update release notes?

#!/bin/bash
# Build verification script for template-cross-platform-app
# This script tests that all build targets work correctly

set -e

echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║              Build Verification Script                               ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Track failures
FAILURES=0

run_test() {
  local test_name="$1"
  local test_command="$2"

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Testing: $test_name"
  echo "Command: $test_command"
  echo ""

  if eval "$test_command"; then
    echo -e "${GREEN}✓ PASSED:${NC} $test_name"
    echo ""
  else
    echo -e "${RED}✗ FAILED:${NC} $test_name"
    echo ""
    FAILURES=$((FAILURES + 1))
  fi
}

# Test 1: Linting
run_test "ESLint" "npm run lint"

# Test 2: Formatting check
run_test "Prettier format check" "npm run format:check"

# Test 3: Web build
run_test "Web production build" "npm run build"

# Test 4: Documentation generation
run_test "TypeDoc documentation generation" "npm run docs:generate"

# Test 5: Documentation validation
run_test "Documentation validation" "npm run docs:validate"

# Test 6: Capacitor sync (requires prior build)
run_test "Capacitor sync" "npm run cap:sync"

# Test 7: Electron build (takes longer, creates packages)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Testing: Electron build (this may take a while...)"
echo "Command: npm run electron:build"
echo ""

if npm run electron:build 2>&1 | grep -q "building.*target"; then
  echo -e "${GREEN}✓ PASSED:${NC} Electron build"
  echo ""
else
  echo -e "${RED}✗ FAILED:${NC} Electron build"
  echo ""
  FAILURES=$((FAILURES + 1))
fi

# Summary
echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║                        Verification Summary                          ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""

if [ $FAILURES -eq 0 ]; then
  echo -e "${GREEN}✓ All build targets verified successfully!${NC}"
  echo ""
  echo "Build artifacts created:"
  echo "  • dist/ - Web production build"
  echo "  • dist/docs/ - Documentation"
  echo "  • electron-dist/ - Electron packages (AppImage, deb)"
  echo "  • android/ - Capacitor Android project"
  echo ""
  exit 0
else
  echo -e "${RED}✗ $FAILURES test(s) failed${NC}"
  echo ""
  exit 1
fi

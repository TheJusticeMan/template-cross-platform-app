#!/bin/bash

# Release script for creating tagged releases
# Usage: ./scripts/release.sh [version]
# Example: ./scripts/release.sh v1.0.0

set -e

VERSION=${1:-}

if [ -z "$VERSION" ]; then
  echo "Error: Version not specified"
  echo "Usage: ./scripts/release.sh [version]"
  echo "Example: ./scripts/release.sh v1.0.0"
  exit 1
fi

# Ensure version starts with 'v'
if [[ ! $VERSION =~ ^v ]]; then
  VERSION="v$VERSION"
fi

echo "Creating release $VERSION..."

# Check if we're on main/master branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "main" && "$BRANCH" != "master" ]]; then
  echo "Warning: Not on main/master branch. Current branch: $BRANCH"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Check if working directory is clean
if [[ -n $(git status -s) ]]; then
  echo "Error: Working directory is not clean. Commit or stash changes first."
  exit 1
fi

# Run tests
echo "Running lint and docs validation..."
npm run lint
npm run docs:validate

# Build production
echo "Building production..."
npm run build

# Create git tag
echo "Creating git tag $VERSION..."
git tag -a "$VERSION" -m "Release $VERSION"

# Push tag to trigger GitHub Actions
echo "Pushing tag to remote..."
git push origin "$VERSION"

echo ""
echo "✅ Release $VERSION created successfully!"
echo "🚀 GitHub Actions will now build and deploy the release."
echo "📦 Check the Actions tab on GitHub for progress."
echo ""

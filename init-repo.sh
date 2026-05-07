#!/bin/bash
# NutriTrack — One-command repo initialization
# Usage: bash init-repo.sh YOUR_GITHUB_USERNAME

set -e

USERNAME=${1:-"YOUR_USERNAME"}
REPO="nutritrack"

echo "🥗 NutriTrack — Initializing production repo..."

# Init git
git init
git add .
git commit -m "feat: initial commit — NutriTrack v1.0.0

🥗 Full-featured nutrition tracking app:
- 300+ USDA-verified food items (dishes, ingredients, snacks)
- 28+ step-by-step recipes across 10 world cuisines
- 4-screen mobile UI: Home/Log, Scanner, Recipes, Cook
- Camera permission flow with live viewfinder
- Quantity selector with real-time macro scaling
- PWA ready (installable on iOS/Android)
- CI/CD pipeline (lint → test → build → GitHub Pages deploy)
- Vitest test suite with data integrity checks"

git branch -M main
git remote add origin "https://github.com/${USERNAME}/${REPO}.git"

echo ""
echo "✅ Ready to push! Run:"
echo ""
echo "   git push -u origin main"
echo ""
echo "🌐 Then enable GitHub Pages at:"
echo "   https://github.com/${USERNAME}/${REPO}/settings/pages"
echo "   → Source: GitHub Actions"
echo ""
echo "🚀 Your app will be live at:"
echo "   https://${USERNAME}.github.io/${REPO}"

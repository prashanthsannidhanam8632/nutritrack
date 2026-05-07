# GitHub Repository Setup Guide

## Step 1 — Create the Repository

1. Go to https://github.com/new
2. Repository name: `nutritrack`
3. Description: `AI-powered nutrition tracker with food scanning, macro tracking and recipe guides`
4. Visibility: **Public** (required for free GitHub Pages)
5. ✅ Add a README — **NO** (we have our own)
6. Click **Create repository**

---

## Step 2 — Push Your Code

Open your terminal and run these commands:

```bash
# Navigate to the project folder
cd nutritrack

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial commit — NutriTrack v1.0.0

- 300+ USDA-verified food items across 10 cuisines
- 28+ recipes with step-by-step cooking instructions and ingredient macros
- 4-screen app: Home/Log, Scanner, Recipes, Cook
- Camera permission flow with getUserMedia
- Quantity selector with live macro scaling
- PWA manifest for mobile installation
- CI/CD pipeline with GitHub Actions
- Full test suite with Vitest"

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nutritrack.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save

The CI/CD pipeline will automatically deploy your app every time you push to `main`.

Your app will be live at: `https://YOUR_USERNAME.github.io/nutritrack`

---

## Step 4 — Add Repository Secrets (Optional)

For analytics or AI features, add secrets at:
**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Value |
|------------|-------|
| `CODECOV_TOKEN` | Get from https://codecov.io (for coverage reports) |

---

## Step 5 — Set Up Branch Protection (Recommended)

At **Settings → Branches → Add branch protection rule**:

- Branch name: `main`
- ✅ Require status checks to pass before merging
  - ✅ `lint-and-test`
  - ✅ `build`
- ✅ Require branches to be up to date
- ✅ Restrict pushes that create files — use PRs for all changes

---

## Step 6 — Add Topics to Your Repo

On the repo homepage, click the gear ⚙️ next to **About** and add:

`react` `vite` `nutrition-tracker` `pwa` `food-scanner` `macro-tracker` `health` `fitness` `javascript`

---

## Done! 🎉

Your production-ready repo is live. Going forward:

```bash
# For new features
git checkout -b feature/your-feature
# ... make changes ...
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature
# Open a PR on GitHub
```

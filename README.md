# 🥗 NutriTrack

> AI-powered nutrition tracker with food scanning, macro tracking, and step-by-step recipe guides.

[![CI/CD](https://github.com/YOUR_USERNAME/nutritrack/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/nutritrack/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📱 Features

| Screen | Description |
|--------|-------------|
| 🏠 **Home** | Log meals, track macros vs goals, set daily targets with presets or manual entry |
| 📸 **Scanner** | Camera food scan, barcode scan, nutrition label OCR, manual lookup |
| 📖 **Recipes** | 150+ recipes across 10 cuisines with full macro data per serving |
| 🍳 **Cook** | Step-by-step cooking guide with ingredient checklist and per-ingredient macros |

### Core Capabilities
- **300+ food items** — USDA-verified nutritional data for dishes, ingredients and snacks
- **10 cuisines** — Indian, Continental, Chinese, Japanese, Korean, Thai, Mediterranean, Mexican, Italian, American
- **Quantity selector** — Set custom servings (0.25x increments) before logging; macros update live
- **Camera permission flow** — Real `getUserMedia` API with Allow/Deny states, scan line animation, error handling
- **Recipe ingredient macros** — Every recipe shows calories and macros per individual ingredient
- **PWA-ready** — Installable on iOS and Android, works offline after first load
- **6 goal presets** — Muscle Gain, Fat Loss, Maintenance, Endurance, Low Carb, High Protein

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/nutritrack.git
cd nutritrack

# Install
npm install

# Start dev server (opens at http://localhost:3000)
npm run dev
```

---

## 🏗️ Project Structure

```
nutritrack/
├── src/
│   ├── data/                   # All nutritional databases
│   │   ├── dishes.js           # 300+ cooked dishes (USDA-verified)
│   │   ├── ingredients.js      # 80+ raw ingredients
│   │   ├── recipes.js          # 150+ recipes with step-by-step instructions
│   │   ├── constants.js        # Meal types, goal presets, theme colors
│   │   └── index.js            # Barrel export
│   │
│   ├── components/             # Shared UI components
│   │   ├── MacroRow.jsx        # Horizontal macro display strip
│   │   ├── MacroProgressBar.jsx # Labeled progress bar with over/under
│   │   ├── QuantityModal.jsx   # Serving-quantity bottom sheet
│   │   └── index.js
│   │
│   ├── screens/                # Full-page screen components
│   │   ├── HomeScreen.jsx      # Log + Add + Goals + Summary tabs
│   │   ├── ScannerScreen.jsx   # Camera flow + manual lookup
│   │   ├── RecipesScreen.jsx   # Recipe browser with filters
│   │   └── CookScreen.jsx      # Step-by-step cooking guide
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useNutritionLog.js  # Log state, totals, add/remove items
│   │   ├── useCamera.js        # Camera permission + stream lifecycle
│   │   └── useRecipeFilters.js # Recipe search/filter state
│   │
│   ├── utils/                  # Pure utility functions
│   │   ├── nutrition.js        # scaleNutrition, sumNutrition, macroPercentages
│   │   └── search.js           # searchAll, filterDishes, getCategories
│   │
│   ├── __tests__/              # Test suite (Vitest)
│   │   ├── nutrition.test.js
│   │   ├── search.test.js
│   │   └── data.test.js
│   │
│   ├── App.jsx                 # Root component + bottom navigation
│   ├── main.jsx                # React DOM entry point
│   └── index.css               # Global styles
│
├── public/
│   ├── index.html              # HTML template
│   └── manifest.json           # PWA manifest
│
├── .github/
│   ├── workflows/ci.yml        # CI/CD: lint → test → build → deploy
│   └── pull_request_template.md
│
├── docs/                       # Extended documentation
│   ├── ARCHITECTURE.md
│   ├── DATA_SCHEMA.md
│   └── CONTRIBUTING.md
│
├── package.json
├── vite.config.js
├── vitest.config.js
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
└── .env.example
```

---

## 📊 Data Schema

### Dish / Food Item
```js
"Butter Chicken": {
  cal: 320,   // calories per serving
  p: 26,      // protein (g)
  f: 18,      // fat (g)
  c: 12,      // carbohydrates (g)
  fi: 1,      // dietary fiber (g)
  na: 590,    // sodium (mg)
  cat: "Indian",       // cuisine category
  veg: 0,              // 1 = vegetarian, 0 = non-vegetarian
  srv: "1 cup"         // serving size label
}
```

### Recipe
```js
"Butter Chicken": {
  cat: "Indian",
  veg: 0,
  time: "45 min",
  serves: 4,
  diff: "Medium",     // Easy | Medium | Hard
  cal: 320, p: 26, f: 18, c: 12, fi: 1, na: 590,
  desc: "Short description",
  ingredients: [
    { name: "Chicken Breast", qty: "500g", cal: 600, p: 115, f: 15, c: 0 },
    // ...
  ],
  steps: [
    { t: "Step Title", d: "Step instructions..." },
    // ...
  ]
}
```

---

## 🧪 Testing

```bash
npm run test            # Run all tests once
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

**Test coverage includes:**
- `utils/nutrition.js` — scaleNutrition, sumNutrition, macroPercentages, progress
- `utils/search.js` — searchAll, filterDishes, getCategories
- `data/*.js` — Schema validation, required fields, data integrity

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |
| `npm test` | Run test suite |

---

## 🚢 Deployment

### GitHub Pages (automatic via CI/CD)
Every push to `main` triggers the GitHub Actions workflow which:
1. Lints the code
2. Runs tests
3. Builds the app
4. Deploys to GitHub Pages

Enable GitHub Pages in your repo settings → **Pages** → Source: **GitHub Actions**.

### Manual Deploy
```bash
npm run build
# Deploy the dist/ folder to any static host:
# Vercel, Netlify, Firebase Hosting, Cloudflare Pages, etc.
```

### Vercel (one-click)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/nutritrack)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/nutritrack)

---

## 🗺️ Roadmap

- [ ] **Real barcode scanning** — Integrate Open Food Facts API or ZXing
- [ ] **AI food recognition** — Anthropic Vision API to identify food from photos
- [ ] **Persistent storage** — IndexedDB for offline log + localStorage for goals
- [ ] **Weekly reports** — Macro trends, calorie history charts
- [ ] **Custom foods** — User-defined food items with custom macros
- [ ] **Water tracking** — Daily hydration log
- [ ] **Recipe scaling** — Scale recipe to desired servings, auto-adjust ingredient quantities
- [ ] **Meal planning** — Plan full days/weeks in advance
- [ ] **Export** — Export food log as CSV/PDF
- [ ] **Dark/Light theme toggle**

---

## 🤝 Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes, then run checks
npm run lint && npm run test

# Push and open a PR
git push origin feature/your-feature-name
```

---

## 📄 License

[MIT](LICENSE) — free to use, modify and distribute.

---

*Built with React + Vite. Nutritional data sourced from USDA FoodData Central.*

# Contributing to NutriTrack

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/nutritrack.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature`
5. Make changes, run `npm run lint && npm test`
6. Commit with a clear message (see conventions below)
7. Push and open a Pull Request

## Commit Convention

```
feat: add barcode scanning to ScannerScreen
fix: correct calorie count for Dal Makhani
data: add 10 new Thai recipes
refactor: extract useCamera hook from ScannerScreen
test: add coverage for scaleNutrition edge cases
docs: update DATA_SCHEMA with recipe fields
```

## Adding Food Data

### Adding a Dish to `src/data/dishes.js`
```js
"Your Dish Name": {
  cal: 250,       // calories per serving (integer)
  p: 12,          // protein in grams
  f: 8,           // fat in grams
  c: 32,          // carbohydrates in grams
  fi: 3,          // dietary fiber in grams
  na: 380,        // sodium in milligrams
  cat: "Indian",  // must match an existing category string
  veg: 1,         // 1 = vegetarian, 0 = non-vegetarian
  srv: "1 cup",   // serving size label shown to user
},
```

**Data sources (in order of preference):**
1. USDA FoodData Central (https://fdc.nal.usda.gov/)
2. Nutritionix API
3. Peer-reviewed nutrition databases

### Adding a Recipe to `src/data/recipes.js`
Each recipe needs:
- `cat`, `veg`, `time`, `serves`, `diff` ("Easy" | "Medium" | "Hard")
- `cal`, `p`, `f`, `c`, `fi`, `na` — macros **per serving**
- `desc` — one-line description
- `ingredients[]` — array with `{ name, qty, cal, p, f, c }`
- `steps[]` — array with `{ t: "Step Title", d: "Step description" }`

## Code Style

- Follow the existing `.eslintrc.cjs` and `.prettierrc` rules
- Run `npm run format` before committing
- Components are function components with hooks
- All new utility functions must have tests

## PR Checklist

- [ ] Tests pass: `npm test`
- [ ] No lint errors: `npm run lint`
- [ ] Tested at 375px viewport (mobile)
- [ ] No hardcoded colors — use `COLORS` from `constants.js`
- [ ] New data has accurate, sourced nutritional values

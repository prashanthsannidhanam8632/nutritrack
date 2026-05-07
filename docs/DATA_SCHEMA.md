# Data Schema Reference

## dishes.js

Each key is the display name. All nutritional values are per the stated `srv` (serving size).

```typescript
interface Dish {
  cal: number;   // Calories (kcal)
  p:   number;   // Protein (g)
  f:   number;   // Total Fat (g)
  c:   number;   // Total Carbohydrates (g)
  fi:  number;   // Dietary Fiber (g)
  na:  number;   // Sodium (mg)
  cat: string;   // Cuisine category
  veg: 0 | 1;   // 0=non-veg, 1=vegetarian
  srv: string;   // Human-readable serving size
}
```

### Current Categories
`Indian` | `Continental` | `American` | `Italian` | `Chinese` | `Japanese` | `Korean` | `Thai` | `Mediterranean` | `Mexican` | `Bakery` | `Snacks` | `Beverages`

---

## ingredients.js

Raw ingredients, typically per 100g or per standard unit.

```typescript
interface Ingredient {
  cal: number;
  p:   number;
  f:   number;
  c:   number;
  fi:  number;
  na:  number;
  cat: string;   // Supplements | Eggs & Dairy | Meat & Fish | Grains | Vegetables | Fruits | Nuts & Seeds | Oils | Pulses | Spices | Sauces | Beverages
  srv: string;
}
```

---

## recipes.js

Full recipe with cooking instructions and per-ingredient macros.

```typescript
interface RecipeIngredient {
  name: string;
  qty:  string;  // e.g. "500g", "2 tbsp", "3 cloves"
  cal:  number;
  p:    number;
  f:    number;
  c:    number;
}

interface RecipeStep {
  t: string;  // Step title (short, e.g. "Marinate Chicken")
  d: string;  // Step description (detailed instructions)
}

interface Recipe {
  cat:     string;
  veg:     0 | 1;
  time:    string;        // e.g. "45 min"
  serves:  number;
  diff:    'Easy' | 'Medium' | 'Hard';
  cal:     number;        // Per serving
  p:       number;
  f:       number;
  c:       number;
  fi:      number;
  na:      number;
  desc:    string;
  ingredients: RecipeIngredient[];
  steps:       RecipeStep[];
}
```

---

## constants.js

```typescript
// Goal preset shape
interface GoalPreset {
  name: string;
  cal:  number;
  p:    number;
  c:    number;
  f:    number;
  fi:   number;
  na:   number;
}

// Macro meta for UI rendering
interface MacroMeta {
  key:   string;
  label: string;
  icon:  string;
  unit:  string;
  color: string;
  step:  number;
  min:   number;
  max:   number;
}
```

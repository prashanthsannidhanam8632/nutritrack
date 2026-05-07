# Architecture

## Overview

NutriTrack is a single-page React application built with Vite. It uses no backend — all data is bundled at build time, with state managed entirely in-browser with React hooks.

## Data Flow

```
src/data/
  dishes.js         ─┐
  ingredients.js     ├─► searched/filtered in utils/search.js
  recipes.js        ─┘
  constants.js       ──► consumed by all components

User interaction
  └─► Screen component
       └─► useNutritionLog hook (log state, totals)
            └─► App.jsx (global state: screen, meal, log, goals)
```

## State Management

There is no Redux or external state library. State lives in:

| Location | What it holds |
|----------|---------------|
| `App.jsx` | Current screen, cooking recipe, meal selector |
| `useNutritionLog` | Food log array, daily totals, goal settings |
| Each screen | Local UI state (search query, active category, modal open) |

## Component Hierarchy

```
App
├── [sticky] Global Header (logo + calorie counter)
├── HomeScreen
│   ├── Daily Summary Bar
│   ├── Meal Selector
│   ├── Sub-tabs: Log | Add | Goals | Summary
│   │   ├── LogView
│   │   ├── AddView ─── QuantityModal
│   │   ├── GoalsView
│   │   └── SummaryView ─── MacroProgressBar[]
│   └── QuantityModal (portal overlay)
├── ScannerScreen
│   ├── Menu (3 scan types + manual lookup)
│   ├── Requesting Permission state
│   ├── Camera Live View (video element)
│   ├── Denied / No Device states
│   └── Result state ─── QuantityModal
├── RecipesScreen
│   ├── Search + Filters
│   └── Recipe Cards
└── CookScreen
    ├── Recipe Header (macros strip)
    ├── Ingredients List (with per-ingredient macros + checkboxes)
    ├── Steps Overview
    ├── Step-by-step View (progress bar + step card)
    └── QuantityModal (to log servings)
```

## Camera Flow

```
User taps scan button
  → requestCamera() calls navigator.mediaDevices.getUserMedia()
  → Browser shows native permission dialog
  → Allow: stream attached to <video ref>, setCameraState('active')
  → Deny:  setCameraState('denied'), show instructions
  → No device: setCameraState('no_device')
  
User taps "Capture & Scan"
  → triggerScan() starts 2.2s simulation (replace with ML SDK)
  → Stops camera stream, returns mock result
  → QuantityModal opens for serving selection
  → User confirms → item added to log
```

## Key Design Decisions

1. **Monolithic data files** — All nutritional data is imported directly rather than fetched from an API. This enables full offline support and zero latency lookups.

2. **No routing library** — The 4-screen nav is simple enough to handle with a `screen` state string in App. No need for React Router.

3. **Inline styles** — Used throughout for performance (no CSS-in-JS runtime, no class lookup) and to keep components self-contained.

4. **Data separation** — dishes, ingredients, and recipes are separate exports. This allows Vite's code splitting to load recipe data only when the recipes screen is visited.

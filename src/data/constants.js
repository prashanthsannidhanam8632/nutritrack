// APP CONSTANTS — Meal types, goal presets, theme colors

export const MEALS = ["Breakfast", "Lunch", "Dinner", "Snack", "Pre-Workout", "Post-Workout"];

export const MEAL_ICONS = {
  Breakfast: "☀️",
  Lunch: "🌤️",
  Dinner: "🌙",
  Snack: "🍎",
  "Pre-Workout": "⚡",
  "Post-Workout": "💪",
};

export const GOAL_PRESETS = [
  { name: "🏋️ Muscle Gain", cal: 2800, p: 200, c: 300, f: 80, fi: 35, na: 2300 },
  { name: "🔥 Fat Loss",     cal: 1600, p: 160, c: 130, f: 55, fi: 30, na: 2000 },
  { name: "⚖️ Maintenance",  cal: 2200, p: 140, c: 245, f: 73, fi: 35, na: 2300 },
  { name: "🏃 Endurance",    cal: 2800, p: 130, c: 380, f: 72, fi: 40, na: 2500 },
  { name: "🥗 Low Carb",     cal: 1800, p: 160, c: 75,  f: 110,fi: 25, na: 2000 },
  { name: "💪 High Protein", cal: 2400, p: 240, c: 200, f: 67, fi: 35, na: 2300 },
];

export const DEFAULT_GOALS = {
  cal: 2000,
  p: 175,
  c: 240,
  f: 60,
  fi: 35,
  na: 2300,
};

export const MACRO_META = [
  { key: "cal", label: "Calories", icon: "🔥", unit: "kcal", color: "#f97316", step: 50, min: 500,  max: 6000 },
  { key: "p",   label: "Protein",  icon: "💪", unit: "g",    color: "#38bdf8", step: 5,  min: 10,   max: 500  },
  { key: "c",   label: "Carbs",    icon: "🌾", unit: "g",    color: "#22c55e", step: 5,  min: 10,   max: 800  },
  { key: "f",   label: "Fat",      icon: "🫙", unit: "g",    color: "#a78bfa", step: 5,  min: 10,   max: 350  },
  { key: "fi",  label: "Fiber",    icon: "🌿", unit: "g",    color: "#86efac", step: 1,  min: 5,    max: 80   },
  { key: "na",  label: "Sodium",   icon: "🧂", unit: "mg",   color: "#f87171", step: 100,min: 500,  max: 6000 },
];

// App color theme
export const COLORS = {
  bg:      "#060810",
  card:    "#0c0f1a",
  card2:   "#111524",
  border:  "#1a2035",
  accent:  "#f97316",
  accent2: "#fb923c",
  green:   "#22c55e",
  blue:    "#38bdf8",
  purple:  "#a78bfa",
  yellow:  "#fbbf24",
  red:     "#f87171",
  teal:    "#2dd4bf",
  text:    "#f0ece6",
  muted:   "#3d4a5c",
  ml:      "#7a8fa8",
};

// Derived category lists — computed once at startup
import { DISHES } from './dishes';
import { INGREDIENTS } from './ingredients';
import { RECIPES } from './recipes';

export const DISH_CATS = ['All', ...new Set(Object.values(DISHES).map(d => d.cat))];
export const ING_CATS  = ['All', ...new Set(Object.values(INGREDIENTS).map(d => d.cat))];
export const RCP_CATS  = ['All', ...new Set(Object.values(RECIPES).map(d => d.cat))];

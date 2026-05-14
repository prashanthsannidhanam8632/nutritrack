MEALS = ["Breakfast", "Lunch", "Dinner", "Snack", "Pre-Workout", "Post-Workout"]

MEAL_ICONS = {
    "Breakfast": "☀️", "Lunch": "🌤️", "Dinner": "🌙",
    "Snack": "🍎", "Pre-Workout": "⚡", "Post-Workout": "💪",
}

GOAL_PRESETS = [
    {"name": "🏋️ Muscle Gain",  "cal": 2800, "p": 200, "c": 300, "f": 80,  "fi": 35, "na": 2300},
    {"name": "🔥 Fat Loss",      "cal": 1600, "p": 160, "c": 130, "f": 55,  "fi": 30, "na": 2000},
    {"name": "⚖️ Maintenance",   "cal": 2200, "p": 140, "c": 245, "f": 73,  "fi": 35, "na": 2300},
    {"name": "🏃 Endurance",     "cal": 2800, "p": 130, "c": 380, "f": 72,  "fi": 40, "na": 2500},
    {"name": "🥗 Low Carb",      "cal": 1800, "p": 160, "c": 75,  "f": 110, "fi": 25, "na": 2000},
    {"name": "💪 High Protein",  "cal": 2400, "p": 240, "c": 200, "f": 67,  "fi": 35, "na": 2300},
]

DEFAULT_GOALS = {"cal": 2000, "p": 175, "c": 240, "f": 60, "fi": 35, "na": 2300}

MACRO_META = [
    {"key": "cal", "label": "Calories", "icon": "🔥", "unit": "kcal", "color": "#f97316", "step": 50,  "min": 500,  "max": 6000},
    {"key": "p",   "label": "Protein",  "icon": "💪", "unit": "g",    "color": "#38bdf8", "step": 5,   "min": 10,   "max": 500},
    {"key": "c",   "label": "Carbs",    "icon": "🌾", "unit": "g",    "color": "#22c55e", "step": 5,   "min": 10,   "max": 800},
    {"key": "f",   "label": "Fat",      "icon": "🫙", "unit": "g",    "color": "#a78bfa", "step": 5,   "min": 10,   "max": 350},
    {"key": "fi",  "label": "Fiber",    "icon": "🌿", "unit": "g",    "color": "#86efac", "step": 1,   "min": 5,    "max": 80},
    {"key": "na",  "label": "Sodium",   "icon": "🧂", "unit": "mg",   "color": "#f87171", "step": 100, "min": 500,  "max": 6000},
]

APP_NAME = "NutriTrack"
APP_VERSION = "2.0.0"

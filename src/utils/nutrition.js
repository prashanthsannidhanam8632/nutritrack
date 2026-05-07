/**
 * nutrition.js — Helper functions for nutrition calculations
 */

/**
 * Scale a nutrition object by a quantity multiplier.
 * @param {object} base - Base nutrition { cal, p, f, c, fi, na }
 * @param {number} qty  - Multiplier (e.g. 1.5 for 1.5 servings)
 * @returns {object} Scaled nutrition values
 */
export function scaleNutrition(base, qty) {
  return {
    cal: Math.round(base.cal * qty),
    p:   Math.round(base.p   * qty * 10) / 10,
    f:   Math.round(base.f   * qty * 10) / 10,
    c:   Math.round(base.c   * qty * 10) / 10,
    fi:  Math.round(base.fi  * qty * 10) / 10,
    na:  Math.round(base.na  * qty),
  };
}

/**
 * Sum all nutrition items in an array.
 * @param {array} items - Array of log items with .n nutrition object
 * @returns {object} Total nutrition
 */
export function sumNutrition(items) {
  return items.reduce(
    (acc, item) => ({
      cal: acc.cal + (item.n?.cal || 0),
      p:   acc.p   + (item.n?.p   || 0),
      c:   acc.c   + (item.n?.c   || 0),
      f:   acc.f   + (item.n?.f   || 0),
      fi:  acc.fi  + (item.n?.fi  || 0),
      na:  acc.na  + (item.n?.na  || 0),
    }),
    { cal: 0, p: 0, c: 0, f: 0, fi: 0, na: 0 }
  );
}

/**
 * Calculate macro breakdown as percentages of total calories.
 * @param {object} nutrition - Nutrition object with p, f, c values
 * @returns {object} Percentage of total calories from each macro
 */
export function macroPercentages(nutrition) {
  const calFromProtein = nutrition.p * 4;
  const calFromCarbs   = nutrition.c * 4;
  const calFromFat     = nutrition.f * 9;
  const total = calFromProtein + calFromCarbs + calFromFat || 1;
  return {
    protein: Math.round((calFromProtein / total) * 100),
    carbs:   Math.round((calFromCarbs   / total) * 100),
    fat:     Math.round((calFromFat     / total) * 100),
  };
}

/**
 * Calculate progress percentage (capped at 100%) and over-budget flag.
 * @param {number} current - Current intake
 * @param {number} goal    - Daily goal
 * @returns {{ pct: number, over: boolean }}
 */
export function progress(current, goal) {
  if (!goal) return { pct: 0, over: false };
  return {
    pct:  Math.min((current / goal) * 100, 100),
    over: current > goal,
  };
}

/**
 * Format a nutrition number for display.
 * Calories are shown as integers; macros to 1 decimal place.
 */
export function fmt(value, isCalorie = false) {
  if (isCalorie) return Math.round(value);
  return Number.isInteger(value) ? value : value.toFixed(1);
}

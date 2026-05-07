import { useState, useCallback } from 'react';
import { DEFAULT_GOALS } from '../data/constants';

/**
 * useNutritionLog
 * Manages the daily food log, macro totals, and goal tracking.
 */
export function useNutritionLog() {
  const [log, setLog] = useState([]);
  const [goals, setGoals] = useState(DEFAULT_GOALS);
  const [meal, setMeal] = useState('Lunch');

  // Computed totals from the log
  const totals = log.reduce(
    (acc, item) => ({
      cal: acc.cal + item.n.cal,
      p:   acc.p   + item.n.p,
      c:   acc.c   + item.n.c,
      f:   acc.f   + item.n.f,
      fi:  acc.fi  + item.n.fi,
      na:  acc.na  + item.n.na,
    }),
    { cal: 0, p: 0, c: 0, f: 0, fi: 0, na: 0 }
  );

  // Items grouped by meal
  const byMeal = log.reduce((acc, item) => {
    acc[item.meal] = acc[item.meal] ? [...acc[item.meal], item] : [item];
    return acc;
  }, {});

  // Add a food item to the log
  const addItem = useCallback((name, nutritionData, servingLabel, vegStatus) => {
    const newItem = {
      id: Date.now() + Math.random(),
      meal,
      name,
      srv: servingLabel,
      veg: vegStatus,
      n: { ...nutritionData },
    };
    setLog(prev => [...prev, newItem]);
  }, [meal]);

  // Remove a specific item from the log
  const removeItem = useCallback((id) => {
    setLog(prev => prev.filter(item => item.id !== id));
  }, []);

  // Clear the entire log
  const clearLog = useCallback(() => setLog([]), []);

  // Scale nutrition by quantity multiplier
  const scaleNutrition = useCallback((baseNutrition, qty) => ({
    cal: Math.round(baseNutrition.cal * qty),
    p:   Math.round(baseNutrition.p   * qty * 10) / 10,
    f:   Math.round(baseNutrition.f   * qty * 10) / 10,
    c:   Math.round(baseNutrition.c   * qty * 10) / 10,
    fi:  Math.round(baseNutrition.fi  * qty * 10) / 10,
    na:  Math.round(baseNutrition.na  * qty),
  }), []);

  return {
    log,
    goals,
    setGoals,
    meal,
    setMeal,
    totals,
    byMeal,
    addItem,
    removeItem,
    clearLog,
    scaleNutrition,
  };
}

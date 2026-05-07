import { describe, it, expect } from 'vitest';
import { scaleNutrition, sumNutrition, macroPercentages, progress, fmt } from '../utils/nutrition';

describe('scaleNutrition', () => {
  const base = { cal: 100, p: 10, f: 5, c: 12, fi: 2, na: 200 };

  it('returns same values for qty=1', () => {
    expect(scaleNutrition(base, 1)).toEqual(base);
  });

  it('doubles all values for qty=2', () => {
    const scaled = scaleNutrition(base, 2);
    expect(scaled.cal).toBe(200);
    expect(scaled.p).toBe(20);
    expect(scaled.na).toBe(400);
  });

  it('handles fractional quantity', () => {
    const scaled = scaleNutrition(base, 0.5);
    expect(scaled.cal).toBe(50);
    expect(scaled.p).toBe(5);
  });

  it('rounds calories to integer', () => {
    const scaled = scaleNutrition({ cal: 97, p: 10, f: 5, c: 10, fi: 2, na: 100 }, 1.5);
    expect(Number.isInteger(scaled.cal)).toBe(true);
  });
});

describe('sumNutrition', () => {
  const items = [
    { n: { cal: 100, p: 10, f: 5, c: 12, fi: 2, na: 200 } },
    { n: { cal: 200, p: 20, f: 8, c: 25, fi: 3, na: 400 } },
  ];

  it('sums all macro values correctly', () => {
    const total = sumNutrition(items);
    expect(total.cal).toBe(300);
    expect(total.p).toBe(30);
    expect(total.na).toBe(600);
  });

  it('returns zeros for empty array', () => {
    const total = sumNutrition([]);
    expect(total.cal).toBe(0);
    expect(total.p).toBe(0);
  });
});

describe('macroPercentages', () => {
  it('returns percentages that sum to ~100', () => {
    const pct = macroPercentages({ p: 150, c: 250, f: 70 });
    expect(pct.protein + pct.carbs + pct.fat).toBeCloseTo(100, 0);
  });

  it('high protein diet shows high protein %', () => {
    const pct = macroPercentages({ p: 200, c: 50, f: 30 });
    expect(pct.protein).toBeGreaterThan(pct.carbs);
    expect(pct.protein).toBeGreaterThan(pct.fat);
  });
});

describe('progress', () => {
  it('returns 0% for zero goal', () => {
    expect(progress(100, 0).pct).toBe(0);
  });

  it('returns 50% at half of goal', () => {
    expect(progress(1000, 2000).pct).toBe(50);
  });

  it('caps at 100% when exceeded', () => {
    expect(progress(3000, 2000).pct).toBe(100);
  });

  it('flags over=true when current exceeds goal', () => {
    expect(progress(2100, 2000).over).toBe(true);
  });

  it('flags over=false when under goal', () => {
    expect(progress(1800, 2000).over).toBe(false);
  });
});

describe('fmt', () => {
  it('rounds calories to integer', () => {
    expect(fmt(182.7, true)).toBe(183);
  });

  it('returns integer macros as-is', () => {
    expect(fmt(26)).toBe(26);
  });

  it('returns 1 decimal for non-integer macros', () => {
    expect(fmt(10.5)).toBe('10.5');
  });
});

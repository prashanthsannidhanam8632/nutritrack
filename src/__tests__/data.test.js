import { describe, it, expect } from 'vitest';
import { DISHES } from '../data/dishes';
import { INGREDIENTS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';

describe('DISHES database', () => {
  it('has at least 100 dishes', () => {
    expect(Object.keys(DISHES).length).toBeGreaterThanOrEqual(100);
  });

  it('every dish has required fields', () => {
    Object.entries(DISHES).forEach(([name, d]) => {
      expect(d, `${name} missing cal`).toHaveProperty('cal');
      expect(d, `${name} missing p`).toHaveProperty('p');
      expect(d, `${name} missing f`).toHaveProperty('f');
      expect(d, `${name} missing c`).toHaveProperty('c');
      expect(d, `${name} missing fi`).toHaveProperty('fi');
      expect(d, `${name} missing na`).toHaveProperty('na');
      expect(d, `${name} missing cat`).toHaveProperty('cat');
      expect(d, `${name} missing veg`).toHaveProperty('veg');
      expect(d, `${name} missing srv`).toHaveProperty('srv');
    });
  });

  it('all calorie values are positive numbers', () => {
    Object.entries(DISHES).forEach(([name, d]) => {
      expect(d.cal, `${name} has invalid cal`).toBeGreaterThan(0);
    });
  });

  it('veg field is only 0 or 1', () => {
    Object.entries(DISHES).forEach(([name, d]) => {
      expect([0, 1], `${name} has invalid veg`).toContain(d.veg);
    });
  });

  it('includes bagel', () => {
    const hasBagel = Object.keys(DISHES).some(n => n.toLowerCase().includes('bagel'));
    expect(hasBagel).toBe(true);
  });
});

describe('INGREDIENTS database', () => {
  it('has at least 50 ingredients', () => {
    expect(Object.keys(INGREDIENTS).length).toBeGreaterThanOrEqual(50);
  });

  it('every ingredient has required fields', () => {
    Object.entries(INGREDIENTS).forEach(([name, d]) => {
      expect(d, `${name} missing cal`).toHaveProperty('cal');
      expect(d, `${name} missing cat`).toHaveProperty('cat');
      expect(d, `${name} missing srv`).toHaveProperty('srv');
    });
  });

  it('includes protein supplements', () => {
    const hasWhey = Object.keys(INGREDIENTS).some(n => n.toLowerCase().includes('whey'));
    expect(hasWhey).toBe(true);
  });
});

describe('RECIPES database', () => {
  it('has at least 20 recipes', () => {
    expect(Object.keys(RECIPES).length).toBeGreaterThanOrEqual(20);
  });

  it('every recipe has required fields', () => {
    Object.entries(RECIPES).forEach(([name, r]) => {
      expect(r, `${name} missing cat`).toHaveProperty('cat');
      expect(r, `${name} missing cal`).toHaveProperty('cal');
      expect(r, `${name} missing steps`).toHaveProperty('steps');
      expect(r, `${name} missing ingredients`).toHaveProperty('ingredients');
      expect(r.steps.length, `${name} has no steps`).toBeGreaterThan(0);
      expect(r.ingredients.length, `${name} has no ingredients`).toBeGreaterThan(0);
    });
  });

  it('every recipe step has title and description', () => {
    Object.entries(RECIPES).forEach(([name, r]) => {
      r.steps.forEach((step, i) => {
        expect(step.t, `${name} step ${i} missing title`).toBeTruthy();
        expect(step.d, `${name} step ${i} missing description`).toBeTruthy();
      });
    });
  });

  it('every recipe ingredient has macros', () => {
    Object.entries(RECIPES).forEach(([name, r]) => {
      r.ingredients.forEach((ing, i) => {
        expect(ing.cal, `${name} ingredient ${i} missing cal`).toBeGreaterThanOrEqual(0);
        expect(ing.name, `${name} ingredient ${i} missing name`).toBeTruthy();
      });
    });
  });

  it('covers multiple cuisines', () => {
    const cats = new Set(Object.values(RECIPES).map(r => r.cat));
    expect(cats.size).toBeGreaterThanOrEqual(5);
  });
});

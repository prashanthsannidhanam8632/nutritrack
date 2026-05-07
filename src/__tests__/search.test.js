import { describe, it, expect } from 'vitest';
import { searchAll, filterDishes, getCategories } from '../utils/search';
import { DISHES } from '../data/dishes';

describe('searchAll', () => {
  it('finds dishes by name', () => {
    const result = searchAll('bagel');
    expect(result.dishes.length).toBeGreaterThan(0);
    expect(result.dishes[0][0].toLowerCase()).toContain('bagel');
  });

  it('returns empty arrays for empty query', () => {
    const result = searchAll('');
    expect(result.dishes).toHaveLength(0);
    expect(result.ingredients).toHaveLength(0);
    expect(result.recipes).toHaveLength(0);
  });

  it('is case-insensitive', () => {
    const lower = searchAll('ramen');
    const upper = searchAll('RAMEN');
    expect(lower.dishes.length + lower.recipes.length).toBeGreaterThan(0);
    expect(lower.recipes.length).toBe(upper.recipes.length);
  });

  it('limits results to 20 dishes', () => {
    const result = searchAll('a'); // broad search
    expect(result.dishes.length).toBeLessThanOrEqual(20);
  });
});

describe('filterDishes', () => {
  it('returns all dishes for default filters', () => {
    const result = filterDishes(DISHES, {});
    expect(result.length).toBe(Object.keys(DISHES).length);
  });

  it('filters by category', () => {
    const indian = filterDishes(DISHES, { category: 'Indian' });
    indian.forEach(([, d]) => expect(d.cat).toBe('Indian'));
  });

  it('filters vegetarian dishes', () => {
    const veg = filterDishes(DISHES, { vegFilter: 'veg' });
    veg.forEach(([, d]) => expect(d.veg).toBe(1));
  });

  it('filters non-vegetarian dishes', () => {
    const nonveg = filterDishes(DISHES, { vegFilter: 'nonveg' });
    nonveg.forEach(([, d]) => expect(d.veg).toBe(0));
  });

  it('filters by search string', () => {
    const result = filterDishes(DISHES, { search: 'butter' });
    result.forEach(([name]) => expect(name.toLowerCase()).toContain('butter'));
  });
});

describe('getCategories', () => {
  it('always includes All as first item', () => {
    const cats = getCategories(DISHES);
    expect(cats[0]).toBe('All');
  });

  it('returns unique categories', () => {
    const cats = getCategories(DISHES);
    const unique = [...new Set(cats)];
    expect(cats).toHaveLength(unique.length);
  });
});

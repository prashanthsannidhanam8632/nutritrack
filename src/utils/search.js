import { DISHES } from '../data/dishes';
import { INGREDIENTS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';

/**
 * Search all food databases for a query string.
 * @param {string} query
 * @returns {{ dishes: array, ingredients: array, recipes: array }}
 */
export function searchAll(query) {
  const q = query.toLowerCase().trim();
  if (!q) return { dishes: [], ingredients: [], recipes: [] };

  const dishes = Object.entries(DISHES)
    .filter(([name]) => name.toLowerCase().includes(q))
    .slice(0, 20);

  const ingredients = Object.entries(INGREDIENTS)
    .filter(([name]) => name.toLowerCase().includes(q))
    .slice(0, 20);

  const recipes = Object.entries(RECIPES)
    .filter(([name]) => name.toLowerCase().includes(q))
    .slice(0, 10);

  return { dishes, ingredients, recipes };
}

/**
 * Filter dishes by category, veg status, and search query.
 */
export function filterDishes(dishes, { category = 'All', vegFilter = 'all', search = '' }) {
  return Object.entries(dishes).filter(([name, d]) => {
    if (category !== 'All' && d.cat !== category) return false;
    if (vegFilter === 'veg' && !d.veg) return false;
    if (vegFilter === 'nonveg' && d.veg) return false;
    if (search && !name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
}

/**
 * Get all unique categories from a database object.
 */
export function getCategories(database) {
  return ['All', ...new Set(Object.values(database).map(d => d.cat))].sort();
}

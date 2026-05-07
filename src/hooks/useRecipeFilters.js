import { useState, useMemo } from 'react';
import { RECIPES } from '../data/recipes';

/**
 * useRecipeFilters
 * Manages recipe search, cuisine and veg/non-veg filters.
 */
export function useRecipeFilters() {
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [vegFilter, setVegFilter] = useState('all'); // all | veg | nonveg

  const cuisines = useMemo(() => {
    const cats = [...new Set(Object.values(RECIPES).map(r => r.cat))].sort();
    return ['All', ...cats];
  }, []);

  const filtered = useMemo(() => {
    return Object.entries(RECIPES).filter(([name, recipe]) => {
      if (cuisine !== 'All' && recipe.cat !== cuisine) return false;
      if (vegFilter === 'veg' && !recipe.veg) return false;
      if (vegFilter === 'nonveg' && recipe.veg) return false;
      if (search && !name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, cuisine, vegFilter]);

  return {
    search, setSearch,
    cuisine, setCuisine,
    vegFilter, setVegFilter,
    cuisines,
    filtered,
  };
}

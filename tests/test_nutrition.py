"""
tests/test_nutrition.py — Unit tests for nutrition utility functions
Run: python -m pytest tests/ -v
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pytest
from utils.nutrition import (
    scale_nutrition, sum_nutrition, macro_percentages,
    progress_pct, items_by_meal
)


class TestScaleNutrition:
    base = {"cal": 100, "p": 10.0, "f": 5.0, "c": 12.0, "fi": 2.0, "na": 200}

    def test_qty_one_returns_same_values(self):
        result = scale_nutrition(self.base, 1)
        assert result["cal"] == 100
        assert result["p"]   == 10.0

    def test_qty_two_doubles_all_values(self):
        result = scale_nutrition(self.base, 2)
        assert result["cal"] == 200
        assert result["p"]   == 20.0
        assert result["na"]  == 400

    def test_fractional_quantity(self):
        result = scale_nutrition(self.base, 0.5)
        assert result["cal"] == 50
        assert result["p"]   == 5.0

    def test_calories_rounded_to_integer(self):
        result = scale_nutrition({"cal": 97, "p": 10, "f": 5, "c": 10, "fi": 2, "na": 100}, 1.5)
        assert isinstance(result["cal"], int)


class TestSumNutrition:
    items = [
        {"nutrition": {"cal": 100, "p": 10.0, "f": 5.0, "c": 12.0, "fi": 2.0, "na": 200}},
        {"nutrition": {"cal": 200, "p": 20.0, "f": 8.0, "c": 25.0, "fi": 3.0, "na": 400}},
    ]

    def test_sums_all_macros(self):
        total = sum_nutrition(self.items)
        assert total["cal"] == 300
        assert total["p"]   == 30.0
        assert total["na"]  == 600

    def test_empty_list_returns_zeros(self):
        total = sum_nutrition([])
        assert total["cal"] == 0
        assert total["p"]   == 0.0


class TestMacroPercentages:
    def test_percentages_sum_to_100(self):
        result = macro_percentages(p=150, c=250, f=70)
        total = result["protein_pct"] + result["carbs_pct"] + result["fat_pct"]
        assert abs(total - 100) <= 2  # allow 2% rounding

    def test_high_protein_shows_high_protein_pct(self):
        result = macro_percentages(p=200, c=50, f=30)
        assert result["protein_pct"] > result["carbs_pct"]
        assert result["protein_pct"] > result["fat_pct"]

    def test_zero_returns_all_zeros(self):
        result = macro_percentages(0, 0, 0)
        assert result == {"protein_pct": 0, "carbs_pct": 0, "fat_pct": 0}


class TestProgressPct:
    def test_zero_goal_returns_zero(self):
        pct, over = progress_pct(100, 0)
        assert pct == 0.0
        assert over is False

    def test_half_returns_50_pct(self):
        pct, over = progress_pct(1000, 2000)
        assert pct == 50.0
        assert over is False

    def test_caps_at_100(self):
        pct, over = progress_pct(3000, 2000)
        assert pct == 100.0
        assert over is True

    def test_exactly_at_goal(self):
        pct, over = progress_pct(2000, 2000)
        assert pct == 100.0
        assert over is False


class TestItemsByMeal:
    def test_groups_by_meal(self):
        log = [
            {"meal": "Breakfast", "nutrition": {"cal": 100, "p": 10, "f": 5, "c": 10, "fi": 1, "na": 50}},
            {"meal": "Lunch",     "nutrition": {"cal": 400, "p": 30, "f": 15, "c": 45, "fi": 5, "na": 600}},
            {"meal": "Breakfast", "nutrition": {"cal": 150, "p": 5,  "f": 8,  "c": 20, "fi": 2, "na": 80}},
        ]
        grouped = items_by_meal(log)
        assert len(grouped["Breakfast"]) == 2
        assert len(grouped["Lunch"])     == 1

    def test_empty_log_returns_empty_dict(self):
        assert items_by_meal([]) == {}


class TestDataIntegrity:
    """Test the food databases have valid data."""

    def test_dishes_have_required_fields(self):
        from data.dishes import DISHES
        required = ["cal", "p", "f", "c", "fi", "na", "cat", "veg", "srv"]
        for name, d in DISHES.items():
            for field in required:
                assert field in d, f"{name} missing field: {field}"

    def test_dishes_positive_calories(self):
        from data.dishes import DISHES
        for name, d in DISHES.items():
            assert d["cal"] >= 0, f"{name} has negative calories"

    def test_dishes_veg_is_boolean(self):
        from data.dishes import DISHES
        for name, d in DISHES.items():
            assert isinstance(d["veg"], bool), f"{name} veg field is not bool"

    def test_bagel_exists_in_database(self):
        from data.dishes import DISHES
        bagel_found = any("bagel" in name.lower() for name in DISHES)
        assert bagel_found, "No bagel found in DISHES database"

    def test_recipes_have_steps(self):
        from data.food_data import RECIPES
        for name, r in RECIPES.items():
            assert len(r["steps"]) > 0, f"{name} has no steps"
            assert len(r["ingredients"]) > 0, f"{name} has no ingredients"

    def test_recipe_steps_have_title_and_description(self):
        from data.food_data import RECIPES
        for name, r in RECIPES.items():
            for i, step in enumerate(r["steps"]):
                assert "t" in step, f"{name} step {i} missing title"
                assert "d" in step, f"{name} step {i} missing description"
                assert len(step["t"]) > 0
                assert len(step["d"]) > 0

    def test_ingredient_macros_are_non_negative(self):
        from data.food_data import RECIPES
        for name, r in RECIPES.items():
            for ing in r["ingredients"]:
                assert ing["cal"] >= 0, f"{name} ingredient has negative cal"
                assert ing["p"]   >= 0
                assert ing["f"]   >= 0
                assert ing["c"]   >= 0

    def test_covers_multiple_cuisines(self):
        from data.food_data import RECIPES
        cats = set(r["cat"] for r in RECIPES.values())
        assert len(cats) >= 5, f"Only {len(cats)} cuisines found, expected at least 5"

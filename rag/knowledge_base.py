"""
rag/knowledge_base.py
=====================
WHAT THIS FILE DOES:
    Converts all NutriTrack data (dishes, ingredients, recipes) into
    plain text "chunks" that can be searched.

WHY WE NEED THIS:
    AI models can't search a Python dictionary directly.
    We need to convert every food item into readable sentences first.
    Then when a user asks a question, we search these sentences.

HOW IT WORKS:
    Each food item becomes a text chunk like:
    "Butter Chicken is an Indian non-vegetarian dish.
     Per 1 cup serving: 320 calories, 26g protein, 18g fat,
     12g carbs, 1g fiber, 590mg sodium."

    These chunks are stored in a list.
    When user asks a question, we search these chunks for relevant ones.
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from data.dishes import DISHES
from data.food_data import INGREDIENTS, RECIPES


def build_dish_chunks() -> list[dict]:
    """
    Convert every dish into a searchable text chunk.

    Returns:
        List of dicts, each with:
            - text: the readable description of the dish
            - metadata: original data for reference
            - type: "dish"
    """
    chunks = []
    for name, d in DISHES.items():
        veg_label = "vegetarian" if d.get("veg") else "non-vegetarian"

        text = (
            f"{name} is a {d.get('cat', 'Unknown')} {veg_label} dish. "
            f"Per {d.get('srv', '1 serving')}: "
            f"{d.get('cal', 0)} calories, "
            f"{d.get('p', 0)}g protein, "
            f"{d.get('f', 0)}g fat, "
            f"{d.get('c', 0)}g carbohydrates, "
            f"{d.get('fi', 0)}g fiber, "
            f"{d.get('na', 0)}mg sodium."
        )

        chunks.append({
            "id":       f"dish_{name}",
            "type":     "dish",
            "name":     name,
            "text":     text,
            "metadata": d,
        })

    return chunks


def build_ingredient_chunks() -> list[dict]:
    """
    Convert every ingredient into a searchable text chunk.
    """
    chunks = []
    for name, d in INGREDIENTS.items():
        text = (
            f"{name} is a {d.get('cat', 'Unknown')} ingredient. "
            f"Per {d.get('srv', '100g')}: "
            f"{d.get('cal', 0)} calories, "
            f"{d.get('p', 0)}g protein, "
            f"{d.get('f', 0)}g fat, "
            f"{d.get('c', 0)}g carbohydrates, "
            f"{d.get('fi', 0)}g fiber."
        )

        chunks.append({
            "id":       f"ingredient_{name}",
            "type":     "ingredient",
            "name":     name,
            "text":     text,
            "metadata": d,
        })

    return chunks


def build_recipe_chunks() -> list[dict]:
    """
    Convert every recipe into searchable text chunks.
    Each recipe creates TWO chunks:
        1. Overview chunk (macros, difficulty, time)
        2. Steps chunk (cooking instructions)
    """
    chunks = []
    for name, r in RECIPES.items():
        veg_label = "vegetarian" if r.get("veg") else "non-vegetarian"

        # ── Chunk 1: Recipe overview ──────────────────────────────────────────
        ingredients_text = ""
        for ing in r.get("ingredients", []):
            ingredients_text += f"{ing['name']} ({ing['qty']}), "
        ingredients_text = ingredients_text.rstrip(", ")

        overview_text = (
            f"{name} is a {r.get('cat', 'Unknown')} {veg_label} recipe. "
            f"Difficulty: {r.get('diff', 'Medium')}. "
            f"Cook time: {r.get('time', 'Unknown')}. "
            f"Serves {r.get('serves', 4)}. "
            f"Description: {r.get('desc', '')}. "
            f"Per serving: {r.get('cal', 0)} calories, "
            f"{r.get('p', 0)}g protein, {r.get('f', 0)}g fat, "
            f"{r.get('c', 0)}g carbs, {r.get('fi', 0)}g fiber. "
            f"Ingredients: {ingredients_text}."
        )

        chunks.append({
            "id":       f"recipe_overview_{name}",
            "type":     "recipe_overview",
            "name":     name,
            "text":     overview_text,
            "metadata": r,
        })

        # ── Chunk 2: Cooking steps ────────────────────────────────────────────
        steps_text = f"How to cook {name}: "
        for i, step in enumerate(r.get("steps", []), 1):
            steps_text += f"Step {i} - {step.get('t', '')}: {step.get('d', '')} "

        chunks.append({
            "id":       f"recipe_steps_{name}",
            "type":     "recipe_steps",
            "name":     name,
            "text":     steps_text,
            "metadata": r,
        })

    return chunks


def build_all_chunks() -> list[dict]:
    """
    Build the complete knowledge base from all NutriTrack data.
    Returns all chunks combined into one list.
    """
    dish_chunks       = build_dish_chunks()
    ingredient_chunks = build_ingredient_chunks()
    recipe_chunks     = build_recipe_chunks()

    all_chunks = dish_chunks + ingredient_chunks + recipe_chunks

    print(f"[Knowledge Base] Built {len(all_chunks)} chunks:")
    print(f"  - {len(dish_chunks)} dish chunks")
    print(f"  - {len(ingredient_chunks)} ingredient chunks")
    print(f"  - {len(recipe_chunks)} recipe chunks")

    return all_chunks


# Build once when module is imported — cached in memory
ALL_CHUNKS = build_all_chunks()

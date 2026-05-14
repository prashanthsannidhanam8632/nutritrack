"""
tests/test_rag.py
=================
Automated tests for the NutriTrack RAG system.
Run with: python -m pytest tests/test_rag.py -v
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pytest
from rag.knowledge_base import build_dish_chunks, build_ingredient_chunks, build_recipe_chunks, build_all_chunks
from rag.retriever import extract_keywords, score_chunk, retrieve, get_context_text


# ══════════════════════════════════════════════════════════════════════════════
# KNOWLEDGE BASE TESTS
# ══════════════════════════════════════════════════════════════════════════════

class TestKnowledgeBase:
    def test_dish_chunks_built(self):
        """All dishes should be converted to text chunks"""
        chunks = build_dish_chunks()
        assert len(chunks) > 100, "Should have 100+ dish chunks"

    def test_dish_chunk_has_required_fields(self):
        """Every dish chunk must have id, type, name, text, metadata"""
        chunks = build_dish_chunks()
        for c in chunks:
            assert "id"       in c, f"Missing 'id' in chunk"
            assert "type"     in c, f"Missing 'type' in chunk"
            assert "name"     in c, f"Missing 'name' in chunk"
            assert "text"     in c, f"Missing 'text' in chunk"
            assert "metadata" in c, f"Missing 'metadata' in chunk"

    def test_dish_chunk_type_is_dish(self):
        """All dish chunks must have type='dish'"""
        chunks = build_dish_chunks()
        for c in chunks:
            assert c["type"] == "dish"

    def test_dish_chunk_text_contains_calories(self):
        """Every dish text chunk must mention calories"""
        chunks = build_dish_chunks()
        for c in chunks:
            assert "calories" in c["text"].lower(), f"'{c['name']}' chunk missing calories"

    def test_dish_chunk_text_contains_protein(self):
        """Every dish text chunk must mention protein"""
        chunks = build_dish_chunks()
        for c in chunks:
            assert "protein" in c["text"].lower(), f"'{c['name']}' chunk missing protein"

    def test_ingredient_chunks_built(self):
        """All ingredients should become text chunks"""
        chunks = build_ingredient_chunks()
        assert len(chunks) >= 50

    def test_recipe_chunks_have_overview_and_steps(self):
        """Each recipe should produce 2 chunks: overview + steps"""
        chunks = build_recipe_chunks()
        overview_names = {c["name"] for c in chunks if c["type"] == "recipe_overview"}
        steps_names    = {c["name"] for c in chunks if c["type"] == "recipe_steps"}
        # Every recipe with overview should also have steps
        for name in overview_names:
            assert name in steps_names, f"Recipe '{name}' missing steps chunk"

    def test_recipe_overview_contains_ingredients(self):
        """Recipe overview chunks must list ingredients"""
        chunks = [c for c in build_recipe_chunks() if c["type"] == "recipe_overview"]
        for c in chunks:
            assert "ingredients" in c["text"].lower(), f"Recipe '{c['name']}' overview missing ingredients"

    def test_all_chunks_combined(self):
        """Total chunk count must be > 200"""
        chunks = build_all_chunks()
        assert len(chunks) > 200, "Should have 200+ total chunks"

    def test_no_duplicate_ids(self):
        """Every chunk must have a unique ID"""
        chunks = build_all_chunks()
        ids = [c["id"] for c in chunks]
        assert len(ids) == len(set(ids)), "Duplicate chunk IDs found!"


# ══════════════════════════════════════════════════════════════════════════════
# RETRIEVER TESTS
# ══════════════════════════════════════════════════════════════════════════════

class TestKeywordExtraction:
    def test_extracts_cuisine(self):
        kws = extract_keywords("Indian dishes")
        assert any("indian" in k.lower() for k in kws)

    def test_removes_stop_words(self):
        kws = extract_keywords("what are the best dishes")
        # "what", "are", "the", "best" should be removed
        assert "what" not in kws
        assert "are"  not in kws
        assert "the"  not in kws

    def test_expands_protein_synonym(self):
        kws = extract_keywords("protein rich food")
        assert any("protein" in k for k in kws)

    def test_empty_query(self):
        kws = extract_keywords("")
        assert isinstance(kws, list)

    def test_returns_list(self):
        kws = extract_keywords("high protein breakfast")
        assert isinstance(kws, list)


class TestChunkScoring:
    def test_relevant_chunk_scores_higher(self):
        relevant_chunk = {
            "text": "Butter Chicken is an Indian non-vegetarian dish. 320 calories, 26g protein.",
            "name": "Butter Chicken",
            "type": "dish",
        }
        irrelevant_chunk = {
            "text": "Plain water has 0 calories and 0 protein.",
            "name": "Water",
            "type": "ingredient",
        }
        keywords = ["indian", "chicken", "protein"]
        r_score = score_chunk(relevant_chunk, keywords)
        i_score = score_chunk(irrelevant_chunk, keywords)
        assert r_score > i_score, "Relevant chunk should score higher"

    def test_zero_score_for_no_match(self):
        chunk = {
            "text": "Broccoli is a vegetable with fiber.",
            "name": "Broccoli",
            "type": "ingredient",
        }
        score = score_chunk(chunk, ["ramen", "japanese", "noodle"])
        assert score == 0.0

    def test_name_match_boosts_score(self):
        chunk = {
            "text": "Dal Tadka is a dish with 10g protein.",
            "name": "Dal Tadka",
            "type": "dish",
        }
        score_with_name = score_chunk(chunk, ["dal"])
        score_no_name   = score_chunk(chunk, ["protein"])
        # "dal" matches in both text AND name, so should score higher
        assert score_with_name > score_no_name


class TestRetrieval:
    def test_returns_list(self):
        results = retrieve("high protein food")
        assert isinstance(results, list)

    def test_returns_correct_count(self):
        results = retrieve("Indian dishes", top_k=5)
        assert len(results) <= 5

    def test_indian_query_returns_indian_results(self):
        results = retrieve("Indian vegetarian dishes", top_k=8)
        names = [r["name"] for r in results]
        # At least one Indian dish should appear
        indian_found = any(
            r["metadata"].get("cat", "").lower() == "indian"
            for r in results if r.get("metadata")
        )
        assert indian_found, f"No Indian dishes in results: {names}"

    def test_recipe_query_finds_recipes(self):
        results = retrieve("how to cook butter chicken recipe", top_k=6)
        types = [r["type"] for r in results]
        assert any("recipe" in t for t in types), "Recipe query should return recipe chunks"

    def test_empty_query_returns_results(self):
        results = retrieve("", top_k=3)
        assert isinstance(results, list)

    def test_context_text_is_string(self):
        results  = retrieve("high protein breakfast", top_k=3)
        context  = get_context_text(results)
        assert isinstance(context, str)
        assert len(context) > 0

    def test_context_text_has_numbered_items(self):
        results = retrieve("Indian food", top_k=3)
        context = get_context_text(results)
        assert "[1]" in context

"""
rag/retriever.py
================
WHAT THIS FILE DOES:
    Searches the knowledge base chunks to find the most relevant
    ones for a user's question.

HOW RETRIEVAL WORKS (Simple Keyword Search):
    We use TF-IDF style keyword scoring — no ML model needed.
    
    Example:
        User asks: "high protein Indian vegetarian dishes"
        Keywords extracted: ["high", "protein", "indian", "vegetarian", "dishes"]
        
        We score every chunk:
            "Paneer Tikka is an Indian vegetarian dish... 26g protein"
            → matches 4 keywords → score = 4 → HIGH relevance
            
            "Chocolate Cake is a Continental sweet... 3g protein"
            → matches 1 keyword → score = 1 → LOW relevance
        
        Return top 5 most relevant chunks.

WHY NOT USE EMBEDDINGS?
    Embeddings (vector search) require heavy ML libraries (sentence-transformers)
    which need gigabytes of disk space. Our keyword approach:
    ✅ Works with zero extra dependencies
    ✅ Fast — no model download needed
    ✅ Accurate enough for nutrition queries (which are factual, not conceptual)
    ✅ Deployable on free Streamlit Cloud without size limits
"""

import re
import math
from typing import Optional
from rag.knowledge_base import ALL_CHUNKS


# ── Nutrition-specific keyword expansions ────────────────────────────────────
# When user says "protein rich", also search for "protein" and "high protein"
SYNONYMS = {
    "protein":      ["protein", "p:", "high protein"],
    "calorie":      ["calorie", "cal", "kcal", "calories"],
    "fat":          ["fat", "fatty", "low fat"],
    "carb":         ["carb", "carbs", "carbohydrate"],
    "fiber":        ["fiber", "fibre", "fi:"],
    "sodium":       ["sodium", "salt", "na:"],
    "veg":          ["vegetarian", "veg", "plant"],
    "nonveg":       ["non-vegetarian", "chicken", "meat", "fish", "egg"],
    "indian":       ["indian", "india"],
    "chinese":      ["chinese", "china"],
    "italian":      ["italian", "italy", "pasta", "pizza"],
    "japanese":     ["japanese", "japan", "ramen", "sushi"],
    "korean":       ["korean", "korea"],
    "thai":         ["thai", "thailand"],
    "mediterranean":["mediterranean", "greek", "middle eastern"],
    "mexican":      ["mexican", "mexico", "taco"],
    "american":     ["american", "burger", "bbq"],
    "breakfast":    ["breakfast", "morning", "oat", "egg"],
    "recipe":       ["recipe", "cook", "how to", "steps"],
    "ingredient":   ["ingredient", "raw", "uncooked"],
    "high protein": ["protein", "p:"],
    "low calorie":  ["calorie", "cal", "low cal"],
    "weight loss":  ["calorie", "low", "fat loss", "deficit"],
    "muscle":       ["protein", "muscle", "gain", "bulk"],
}


def extract_keywords(query: str) -> list[str]:
    """
    Extract meaningful keywords from the user's query.
    Removes common stop words, expands synonyms.
    """
    # Remove punctuation, lowercase
    query = re.sub(r"[^\w\s]", " ", query.lower())

    # Stop words to ignore
    stop_words = {
        "what", "is", "are", "the", "a", "an", "in", "of", "for",
        "to", "and", "or", "with", "can", "i", "me", "my", "have",
        "do", "does", "which", "how", "best", "good", "show", "tell",
        "give", "find", "list", "any", "all", "some", "more", "less",
    }

    words = [w for w in query.split() if w not in stop_words and len(w) > 2]

    # Expand with synonyms
    expanded = set(words)
    for word in words:
        for key, synonyms in SYNONYMS.items():
            if word in key or key in word:
                expanded.update(synonyms)

    return list(expanded)


def score_chunk(chunk: dict, keywords: list[str]) -> float:
    """
    Score a single chunk based on how many keywords it contains.
    
    Scoring logic:
    - Each keyword match = +1.0 base score
    - Match in chunk name (exact) = +3.0 bonus (name match is very relevant)
    - Match in chunk type = +1.5 bonus
    - Multiple matches of same keyword = no extra score (deduplication)
    """
    text  = chunk["text"].lower()
    name  = chunk["name"].lower()
    score = 0.0

    matched = set()
    for keyword in keywords:
        kw = keyword.lower()
        if kw in matched:
            continue
        if kw in text:
            score += 1.0
            matched.add(kw)
        if kw in name:
            score += 2.0  # Extra bonus for name match

    # Boost recipe overview chunks slightly (they're most useful)
    if chunk["type"] == "recipe_overview":
        score *= 1.1

    return score


def retrieve(
    query: str,
    top_k: int = 6,
    chunk_type: Optional[str] = None,
) -> list[dict]:
    """
    Main retrieval function — searches the knowledge base.
    
    Args:
        query:      User's question in natural language
        top_k:      How many chunks to return (default: 6)
        chunk_type: Filter to only "dish", "ingredient", "recipe_overview"
                    or "recipe_steps". None = search all.
    
    Returns:
        List of the most relevant chunks (dicts with text + metadata)
    
    Example:
        retrieve("high protein Indian dishes", top_k=5)
        → Returns 5 most relevant dish/recipe chunks
    """
    keywords = extract_keywords(query)

    if not keywords:
        # No meaningful keywords — return a sample from all types
        return ALL_CHUNKS[:top_k]

    # Filter by type if specified
    pool = ALL_CHUNKS
    if chunk_type:
        pool = [c for c in ALL_CHUNKS if c["type"] == chunk_type]

    # Score every chunk
    scored = []
    for chunk in pool:
        score = score_chunk(chunk, keywords)
        if score > 0:
            scored.append((score, chunk))

    # Sort by score descending
    scored.sort(key=lambda x: x[0], reverse=True)

    # Return top_k
    return [chunk for _, chunk in scored[:top_k]]


def retrieve_for_display(query: str, top_k: int = 6) -> list[dict]:
    """
    Retrieve with score included — useful for debugging/display.
    Returns list of {chunk, score} dicts.
    """
    keywords = extract_keywords(query)
    scored = []

    for chunk in ALL_CHUNKS:
        score = score_chunk(chunk, keywords)
        if score > 0:
            scored.append({"chunk": chunk, "score": round(score, 2)})

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:top_k]


def get_context_text(chunks: list[dict]) -> str:
    """
    Combine retrieved chunks into a single context string
    to pass to the AI model.
    """
    context_parts = []
    for i, chunk in enumerate(chunks, 1):
        context_parts.append(f"[{i}] {chunk['text']}")
    return "\n\n".join(context_parts)

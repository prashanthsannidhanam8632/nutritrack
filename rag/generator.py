"""
rag/generator.py
================
WHAT THIS FILE DOES:
    Takes the retrieved context chunks and the user's question,
    sends them to Claude AI, and returns a helpful answer.

THIS IS THE "G" IN RAG (Generation step):
    R = Retrieve  →  retriever.py finds relevant food data
    A = Augment   →  we combine context + question into a prompt
    G = Generate  →  THIS FILE sends it to Claude and gets an answer

HOW THE PROMPT IS BUILT:
    System prompt: "You are a nutrition assistant for NutriTrack.
                    Answer ONLY using the provided food data."
    
    User message:  "CONTEXT:
                    [1] Butter Chicken is an Indian non-veg dish...
                    [2] Chicken Biryani is an Indian non-veg dish...
                    
                    QUESTION: What are the best high protein Indian dishes?"
    
    Claude reads the context → answers specifically from NutriTrack's data.

WHY THIS MATTERS:
    Without RAG: Claude might hallucinate food data or give generic answers.
    With RAG: Claude answers specifically about NutriTrack's 167 dishes.
"""

import anthropic
import streamlit as st
from rag.retriever import retrieve, get_context_text


# ── Anthropic client ──────────────────────────────────────────────────────────
# Uses the API key from Streamlit secrets or environment variable
def get_client():
    try:
        api_key = st.secrets.get("ANTHROPIC_API_KEY", "")
    except Exception:
        api_key = ""

    if not api_key:
        # Try environment variable as fallback
        import os
        api_key = os.environ.get("ANTHROPIC_API_KEY", "")

    if not api_key:
        return None

    return anthropic.Anthropic(api_key=api_key)


# ── System Prompt ─────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are NutriBot — an intelligent nutrition assistant for the NutriTrack app.

Your job is to answer questions about food, nutrition, and cooking using ONLY the data provided in the CONTEXT section below. 

RULES:
1. Answer ONLY based on the provided context. Do not use outside knowledge for specific nutritional values.
2. If the context doesn't contain enough information to answer, say "I don't have that specific data in NutriTrack's database."
3. When recommending dishes, always mention the key macros (calories, protein, carbs, fat).
4. Keep answers friendly, clear, and practical.
5. For recipe questions, provide actionable cooking guidance.
6. Always mention if a dish is vegetarian or non-vegetarian when relevant.
7. Format numbers clearly: "320 kcal", "26g protein" etc.

You have access to NutriTrack's complete database of:
- 167+ cooked dishes from 10 world cuisines
- 76 raw ingredients
- 28+ complete recipes with step-by-step instructions
"""


def generate_answer(query: str, conversation_history: list = None) -> dict:
    """
    Full RAG pipeline: Retrieve → Augment → Generate
    
    Args:
        query:                User's question
        conversation_history: Previous messages for multi-turn chat
    
    Returns:
        Dict with:
            - answer:    Claude's response
            - sources:   Which chunks were used
            - keywords:  What keywords were searched
            - error:     Error message if something went wrong
    """
    client = get_client()

    if not client:
        return {
            "answer": "⚠️ API key not configured. Please add your Anthropic API key in Streamlit secrets (ANTHROPIC_API_KEY) to use NutriBot.",
            "sources": [],
            "keywords": [],
            "error": "no_api_key",
        }

    # ── Step 1: RETRIEVE — find relevant chunks ───────────────────────────────
    relevant_chunks = retrieve(query, top_k=6)

    if not relevant_chunks:
        relevant_chunks = retrieve(query, top_k=3)  # Try with fewer

    # ── Step 2: AUGMENT — build the context-enriched prompt ───────────────────
    context_text = get_context_text(relevant_chunks)

    augmented_message = f"""CONTEXT (NutriTrack food database — use this to answer):
{context_text}

QUESTION: {query}

Please answer the question using the context above."""

    # ── Step 3: GENERATE — call Claude AI ─────────────────────────────────────
    messages = []

    # Add conversation history for multi-turn chat
    if conversation_history:
        for msg in conversation_history[-6:]:  # Keep last 6 exchanges
            messages.append(msg)

    messages.append({"role": "user", "content": augmented_message})

    try:
        response = anthropic.Anthropic(
            api_key=get_client().api_key
        ).messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=messages,
        )

        answer = response.content[0].text

        return {
            "answer":   answer,
            "sources":  relevant_chunks,
            "keywords": [],
            "error":    None,
        }

    except anthropic.AuthenticationError:
        return {
            "answer": "⚠️ Invalid API key. Please check your Anthropic API key in Streamlit secrets.",
            "sources": [],
            "keywords": [],
            "error": "auth_error",
        }
    except anthropic.RateLimitError:
        return {
            "answer": "⚠️ Rate limit reached. Please wait a moment and try again.",
            "sources": [],
            "keywords": [],
            "error": "rate_limit",
        }
    except Exception as e:
        return {
            "answer": f"⚠️ Something went wrong: {str(e)}",
            "sources": [],
            "keywords": [],
            "error": str(e),
        }


def generate_streaming_answer(query: str):
    """
    Streaming version — yields answer token by token for a typing effect.
    Used with st.write_stream() in Streamlit.
    """
    client = get_client()

    if not client:
        yield "⚠️ API key not configured. Add ANTHROPIC_API_KEY to Streamlit secrets."
        return

    relevant_chunks = retrieve(query, top_k=6)
    context_text    = get_context_text(relevant_chunks)

    augmented_message = f"""CONTEXT (NutriTrack food database):
{context_text}

QUESTION: {query}"""

    try:
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": augmented_message}],
        ) as stream:
            for text in stream.text_stream:
                yield text

    except Exception as e:
        yield f"⚠️ Error: {str(e)}"

import os
import anthropic
from rag.retriever import retrieve, get_context_text

def get_api_key():
    try:
        import streamlit as st
        key = st.secrets.get("ANTHROPIC_API_KEY", "")
        if key:
            return key
    except Exception:
        pass
    return os.environ.get("ANTHROPIC_API_KEY", "")

SYSTEM_PROMPT = """You are NutriBot — a friendly AI nutrition assistant for NutriTrack.
Answer questions about food, nutrition and cooking using ONLY the CONTEXT provided.
Always mention calories, protein, carbs and fat. Keep answers clear and practical."""

def generate_answer(query, conversation_history=None):
    api_key = get_api_key()
    if not api_key:
        return {"answer": "API key not configured. Add ANTHROPIC_API_KEY to .streamlit/secrets.toml", "sources": [], "error": "no_api_key"}
    relevant_chunks = retrieve(query, top_k=6)
    context_text = get_context_text(relevant_chunks)
    augmented = f"CONTEXT:\n{context_text}\n\nQUESTION: {query}\n\nAnswer using the context above."
    messages = []
    if conversation_history:
        for msg in conversation_history[-6:]:
            if msg.get("role") in ("user","assistant") and msg.get("content"):
                messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": augmented})
    try:
        client = anthropic.Anthropic(api_key=api_key)
        response = client.messages.create(model="claude-haiku-4-5-20251001", max_tokens=1024, system=SYSTEM_PROMPT, messages=messages)
        return {"answer": response.content[0].text, "sources": relevant_chunks, "error": None}
    except anthropic.AuthenticationError:
        return {"answer": "Invalid API key. Check your key at console.anthropic.com", "sources": [], "error": "auth_error"}
    except Exception as e:
        return {"answer": f"Error: {str(e)}", "sources": [], "error": str(e)}


def generate_streaming_answer(query: str):
    """Streaming version — kept for compatibility."""
    result = generate_answer(query)
    yield result["answer"]

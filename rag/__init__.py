"""
rag/__init__.py — Public API for the NutriTrack RAG module.
"""
from rag.knowledge_base import ALL_CHUNKS, build_all_chunks
from rag.retriever import retrieve, retrieve_for_display, get_context_text
from rag.generator import generate_answer, generate_streaming_answer

__all__ = [
    "ALL_CHUNKS", "build_all_chunks",
    "retrieve", "retrieve_for_display", "get_context_text",
    "generate_answer", "generate_streaming_answer",
]

import { RAG } from "@convex-dev/rag";
import { components } from "../../_generated/api";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";

const rag = new RAG(components.rag, {
    textEmbeddingModel: google.embedding("text-embedding-004"),
    embeddingDimension: 768
});

export default rag;
import { createTool } from "@convex-dev/agent";
import z from "zod";
import { internal } from "../../../_generated/api";
import rag from "../rag";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { SupportAgent } from "../agent/supportAgent";
import { SEARCH_INTERPRETER_PROMPT } from "../constant";

export const search = createTool({
  description:
    "Search the knowledge base for relevant information to help answer user questions",
  args: z.object({
    query: z
      .string()
      .describe("The search query to find relevant informations"),
  }),
  handler: async (ctx, args) => {
    if (!ctx.threadId) {
      return "Missing thread ID";
    }
    const conversation = await ctx.runQuery(
      internal.system.conversations.getByThreadId,
      { threadId: ctx.threadId }
    );
    if (!conversation) {
      return "Conversation not found";
    }
    const orgId = conversation.organizationId;

    const searchResults = await rag.search(ctx, {
      namespace: orgId,
      query: args.query,
      limit: 5,
    });

    const contextText = `Found results in ${searchResults.entries
      .map((e) => e.title || null)
      .filter((t) => t !== null)
      .join(", ")} . Here is the context:\n\n${searchResults.text}`;

    const response = await generateText({
      messages: [
        {
          role: "system",
          content: SEARCH_INTERPRETER_PROMPT
        },
        {
          role: "user",
          content: `User asked : ${args.query}\n\nSearch results : ${contextText}`,
        },
      ],
      model: google.chat("gemini-2.5-flash"),
    });

    await SupportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      message: {
        role: "assistant",
        content: response.text,
      },
    });

    return response.text;
  },
});

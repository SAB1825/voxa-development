import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getOne = query({
  args: {
    conversationId  : v.id("conversation"),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if(!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw null;
    }
    return {
        _id : conversation._id,
        status : conversation.status,
        threadId : conversation.threadId
    }
  },
});


export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }
    const threadId = "123"
    const conversationId = await ctx.db.insert("conversation", {
        contactSessionId : session._id,
        status : "unresolved",
        organizationId : args.organizationId,
        threadId
    });
    return conversationId
  },
});

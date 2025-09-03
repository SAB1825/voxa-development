import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

const AUTO_REFRESH_THRESHOLD_MS = 4 * 60 * 60 * 1000;
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export const getOne = internalQuery({
  args: {
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.contactSessionId);
  },
});

export const refresh = internalMutation({
  args: {
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);
    if (!contactSession) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Contact session not found!",
      });
    }

    if (contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Contact Session expired!",
      });
    }

    const timeRemaining = contactSession.expiresAt - Date.now();
    if (timeRemaining < AUTO_REFRESH_THRESHOLD_MS) {
      await ctx.db.patch(args.contactSessionId, {
        expiresAt: Date.now() + SESSION_DURATION,
      });
    }

    return { contactSession, expiresAt: Date.now() + SESSION_DURATION };
  },
});

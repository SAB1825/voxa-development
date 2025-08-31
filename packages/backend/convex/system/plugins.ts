import { v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

export const upsert = internalMutation({
  args: {
    service: v.union(v.literal("vapi")),
    secretName: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingPlugin = await ctx.db
      .query("plugins")
      .withIndex("by_organization_id_and_service", (q) =>
        q.eq("organizationId", args.orgId).eq("service", args.service)
      )
      .unique();

    if (existingPlugin) {
      await ctx.db.patch(existingPlugin._id, {
        service: args.service,
        secretName: args.secretName,
      });
    } else {
      await ctx.db.insert("plugins", {
        service: args.service,
        secretName: args.secretName,
        organizationId: args.orgId,
      });
    }
  },
});

export const getByOrganizationIdAndService = internalQuery({
  args: {
    service: v.union(v.literal("vapi")),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("plugins")
      .withIndex("by_organization_id_and_service", (q) =>
        q.eq("organizationId", args.orgId).eq("service", args.service)
      )
      .unique();
  },
});
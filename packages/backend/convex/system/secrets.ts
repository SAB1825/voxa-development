import { v } from "convex/values";
import { internalAction } from "../_generated/server";
import { upsertSecret } from "../lib/secrets";
import { internal } from "../_generated/api";


export const upsert = internalAction({
    args : {
        orgId : v.string(),
        service : v.union(v.literal("vapi")),
        value : v.any()
    },
    handler : async (ctx, args) => {
        const secretName = `tenant/${args.orgId}/${args.service}`;
        await upsertSecret(secretName, args.value);
        await ctx.runMutation(internal.system.plugins.upsert, {
            service: args.service,
            secretName: secretName,
            orgId: args.orgId
        })
        return {
            status : "success"
        }
    }
})
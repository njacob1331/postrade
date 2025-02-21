import { internalMutation, query, QueryCtx, internalQuery } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";
import { currentUser } from "@clerk/nextjs/server";
import { mutation } from "./_generated/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const userAttributes = {
        clerkUserId: data.id,
        username: data.username ?? data.id,
        email: data.email_addresses[0].email_address,
        firstname: data.first_name ?? undefined,
        lastname: data.last_name ?? undefined,
        image: data.image_url,
        snaptradeId: undefined,
        snaptradeSecret: undefined
    };

    const user = await userByExternalId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", externalId))
    .unique();
}


export const storeSnapTradeSecret = mutation({
  args: { userId: v.string(), snaptradeSecret: v.string() },
  async handler(ctx, args) {
    const user = await userByExternalId(ctx, args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    await ctx.db.patch(user._id, { snaptradeSecret: args.snaptradeSecret });
  },
});

export const deleteSnapTradeUser = mutation({
  args: { userId: v.string() },
  async handler(ctx, args) {
    const user = await userByExternalId(ctx, args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    await ctx.db.patch(user._id, { snaptradeSecret: undefined });
  },
});

export const getSnaptradeSecret = query({
  args: { userId: v.string() },
  async handler(ctx, args) {
    const user = await userByExternalId(ctx, args.userId);
    return user?.snaptradeSecret ?? null;
  },
});
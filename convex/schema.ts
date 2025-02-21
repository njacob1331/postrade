import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    username: v.string(),
    email: v.string(),
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    image: v.optional(v.string()),
    snaptradeSecret: v.optional(v.string()),
  }).index("by_clerk_user_id", ["clerkUserId"]),
  communities: defineTable({
    banner: v.optional(v.null()),
    category: v.string(),
    description: v.string(),
    icon: v.optional(v.null()),
    name: v.string(),
    rules: v.string(),
    creatorId: v.string(),
    members: v.array(v.string()),
  }),
  messages: defineTable({
    message: v.string(),
    role: v.string(),
    username: v.string(),
  }),
});
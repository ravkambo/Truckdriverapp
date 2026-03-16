import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitApplication = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    rawData: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("applications", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      status: "Pending",
      rawData: args.rawData,
    });
    return id;
  },
});

export const getApplications = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("applications").order("desc").collect();
  },
});

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  applications: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    status: v.string(), // "Pending", "Reviewed", "Approved", "Rejected"
    rawData: v.string(), // full JSON payload
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"]),
});

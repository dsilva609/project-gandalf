import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  products: defineTable({
    title: v.string(),
    imageId: v.string(),
    price: v.number(),
  }),
  requests: defineTable({
    approved: v.boolean(),
    request: v.string(),
    status: v.string(),
    createdBy: v.id('users'),
    updatedBy: v.id('users'),
    updatedOn: v.number(),
  }),
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),
  users: defineTable({
    displayName: v.string(),
    externalId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    updatedOn: v.number(),
  }).index('by_external_id', ['externalId']),
})

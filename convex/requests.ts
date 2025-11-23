import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('requests')
      .withIndex('by_creation_time')
      .order('desc')
      .collect()
  },
})

export const add = mutation({
  args: { request: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_external_id', (q) => q.eq('externalId', args.userId))
      .first()

    if (!user) {
      throw new Error('User not found')
    }
    return await ctx.db.insert('requests', {
      request: args.request,
      approved: false,
      status: 'pending',
      createdBy: user._id,
      updatedBy: user._id,
      updatedOn: Date.now(),
    })
  },
})

export const remove = mutation({
  args: { id: v.id('requests') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id)
  },
})

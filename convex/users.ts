import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const getByExternalId = query({
  args: { externalId: v.string() },
  returns: v.union(
    v.object({
      _id: v.id('users'),
      _creationTime: v.number(),
      displayName: v.string(),
      externalId: v.string(),
      firstName: v.string(),
      lastName: v.string(),
      updatedOn: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_external_id', (q) => q.eq('externalId', args.externalId))
      .first();
  },
});

export const create = mutation({
  args: {
    externalId: v.string(),
    displayName: v.string(),
    firstName: v.string(),
    lastName: v.string(),
  },
  handler: async (ctx, args) =>
    await ctx.db.insert('users', {
      externalId: args.externalId,
      displayName: args.displayName,
      firstName: args.firstName,
      lastName: args.lastName,
      updatedOn: Date.now(),
    }),
});

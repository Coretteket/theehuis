import * as trpc from '@trpc/server';
import { z } from 'zod';
import type { Context } from '.';
import prisma from '../prismaClient';

export default trpc
  .router<Context>()
  .query('list', {
    resolve: async ({ ctx }) => {
      return prisma.bulletin.findMany({
        select: {
          id: true,
          updatedAt: true,
          user: { select: { id: true, name: true, gravatar: true } },
          title: true,
          message: true,
          likedBy: { select: { id: true, name: true, gravatar: true } },
        },
        orderBy: [{ updatedAt: 'desc' }],
      });
    },
  })
  .mutation('like', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const likedResponse = await prisma.bulletin.findUnique({
        where: { id: input },
        select: { userId: true, likedBy: { select: { id: true } } },
      });

      if (likedResponse?.userId === ctx.user?.id) return null;

      const filtered = likedResponse?.likedBy.filter((user) => user.id === ctx.user?.id);
      const like = filtered && filtered.length === 0;

      const id = { id: ctx.user?.id };
      const likedBy = like ? { connect: id } : { disconnect: id };

      const response = await prisma.bulletin.update({
        where: { id: input },
        data: { likedBy },
        select: { id: true, likedBy: { select: { id: true, name: true, gravatar: true } } },
      });

      return { liked: like, ...response };
    },
  });

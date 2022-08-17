import * as trpc from '@trpc/server';
import { z } from 'zod';
import type { Context } from '.';
import prisma from '../prismaClient';

export default trpc
  .router<Context>()
  .query('list', {
    resolve: async ({ ctx }) => {
      if (!ctx.user?.houseId) return null;
      const userData = { select: { id: true, name: true, gravatar: true } };
      return prisma.bulletin.findMany({
        select: {
          id: true,
          updatedAt: true,
          author: userData,
          title: true,
          message: true,
          likedBy: userData,
        },
        where: { houseId: ctx.user?.houseId },
        orderBy: [{ updatedAt: 'desc' }],
      });
    },
  })
  .mutation('like', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const likedResponse = await prisma.bulletin.findUnique({
        where: { id: input },
        select: { authorId: true, likedBy: { select: { id: true } } },
      });

      if (likedResponse?.authorId === ctx.user?.id) return null;

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
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid(),
      authorId: z.string().cuid(),
      text: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      if (ctx.user?.id !== input.authorId) return null;
      const response = await prisma.bulletin.update({
        where: { id: input.id },
        data: { message: input.text },
        include: { author: true, likedBy: true },
      });
      return response;
    },
  });

import * as trpc from '@trpc/server';
import type { Context } from '.';
import prisma from '../prismaClient';

export default trpc
  .router<Context>()
  .query('get', {
    resolve: async ({ ctx }) => {
      const fullUser = await prisma.user.findUnique({
        where: { id: ctx.user?.id },
      });
      if (!fullUser) throw Error('User not found');
      const { passwordHash, ...user } = fullUser;
      return user;
    },
  })
  .query('housemates', {
    resolve: async ({ ctx }) => {
      if (!ctx.user?.houseId) return null;
      const response = await prisma.house.findUnique({
        where: { id: ctx.user?.houseId },
        select: { inhabitants: { select: { id: true, name: true, gravatar: true } } },
      });
      return response?.inhabitants ?? null;
    },
  });

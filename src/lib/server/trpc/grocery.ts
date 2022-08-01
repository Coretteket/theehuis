import * as trpc from '@trpc/server';
import type { Context } from '.';
import prisma from '../prismaClient';

export default trpc.router<Context>().query('list', {
  resolve: async ({ ctx }) => {
    return prisma.grocery.findMany({
      select: { id: true, name: true, notes: true, active: true },
      orderBy: [{ createdAt: 'desc' }],
      where: { houseId: ctx.user?.houseId },
    });
  },
});

import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import type { Context } from '.';
import prisma from '../prismaClient';

export default trpc.router<Context>().query('list', {
  resolve: async ({ ctx }) => {
    if (!ctx.user?.houseId) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return prisma.grocery.findMany({
      select: { id: true, name: true, notes: true, archive: true },
      orderBy: [{ createdAt: 'desc' }],
      where: { houseId: ctx.user?.houseId },
    });
  },
});

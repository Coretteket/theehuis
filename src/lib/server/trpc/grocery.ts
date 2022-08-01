import * as trpc from '@trpc/server';
import prisma from '../prismaClient';

export default trpc.router().query('list', {
  resolve: () =>
    prisma.grocery.findMany({
      orderBy: [{ createdAt: 'desc' }],
    }),
});
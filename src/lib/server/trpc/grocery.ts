import * as trpc from '@trpc/server';
import { z } from 'zod';
import prisma from '../prismaClient';

export default trpc.router().query('list', {
  input: z.string().nullable(),
  resolve: ({ input }) =>
    prisma.grocery.findMany({
      orderBy: [{ createdAt: 'desc' }],
      where: { houseId: input },
    }),
});

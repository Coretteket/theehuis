import * as trpc from '@trpc/server';
import type { Context } from '.';
import prisma from '../prismaClient';

export default trpc.router<Context>().query('get', {
  resolve: ({ ctx }) =>
    prisma.user.findUnique({
      select: { id: true, name: true, email: true, houseId: true, admin: true, gravatar: true },
      where: { id: ctx.user?.id },
    }),
});

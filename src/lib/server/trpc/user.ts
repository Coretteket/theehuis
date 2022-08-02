import * as trpc from '@trpc/server';
import type { Context } from '.';
import prisma from '../prismaClient';

export default trpc.router<Context>().query('get', {
  resolve: async ({ ctx }) => {
    const fullUser = await prisma.user.findUnique({
      where: { id: ctx.user?.id },
    });
    if (!fullUser) throw Error('User not found');
    const { passwordHash, ...user } = fullUser;
    return user;
  },
});

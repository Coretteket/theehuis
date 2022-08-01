import prisma from '../prismaClient';
import trpc from '@trpc/server';

export default trpc.router().query('users', {
  resolve: () =>
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        gravatar: true,
        house: { select: { name: true } },
      },
      orderBy: [{ createdAt: 'asc' }],
    }),
});

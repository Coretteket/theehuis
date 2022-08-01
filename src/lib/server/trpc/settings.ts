import * as trpc from '@trpc/server';
import prisma from '../prismaClient';
import { z } from 'zod';
import type { Context } from '.';
import { Md5 } from 'ts-md5/dist/md5';

export default trpc.router<Context>().mutation('gravatar', {
  input: z.boolean(),
  resolve: async ({ input, ctx }) => {
    const md5 = Md5.hashStr(ctx.user?.email.toLocaleLowerCase() ?? '');
    const gravatarUrl = input ? `https://www.gravatar.com/avatar/${md5}?d=identicon` : null;
    return await prisma.user.update({
      where: { id: ctx.user?.id },
      data: { gravatar: gravatarUrl },
      select: { id: true, gravatar: true },
    });
  },
});

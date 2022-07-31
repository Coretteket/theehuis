import * as trpc from '@trpc/server';
import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';

import { loginSchema, registerSchema } from '$lib/client/schema';
import type { createContext } from '.';
import type { inferAsyncReturnType } from '@trpc/server';

export default trpc
  .router<inferAsyncReturnType<typeof createContext>>()
  .mutation('register', {
    input: registerSchema,
    resolve: async ({ input }) =>
      await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          passwordHash: await bcrypt.hash(input.password, 10),
        },
        select: { id: true },
      }),
  })
  .mutation('login', {
    input: loginSchema,
    resolve: async ({ input, ctx }) => {
      const user = await prisma.user.findUnique({ where: { email: input.email } });

      const passwordMatch = user && (await bcrypt.compare(input.password, user.passwordHash));

      if (!user || !passwordMatch) return { success: false, error: 'Onjuist e-mailadres of wachtwoord.' };

      return { success: true, user };
    },
  });

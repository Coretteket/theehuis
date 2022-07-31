import * as trpc from '@trpc/server';
import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '$env/static/private';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import z from 'zod';

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
    resolve: async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      const passwordMatch = user && (await bcrypt.compare(input.password, user.passwordHash));

      if (!user || !passwordMatch) return { success: false, error: 'Onjuist e-mailadres of wachtwoord.' };

      const publicUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(publicUser, JWT_SECRET);

      return { success: true, user: publicUser, token };
    },
  });

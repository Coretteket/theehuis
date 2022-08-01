import * as trpc from '@trpc/server';
import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

import { loginSchema, registerSchema } from '$lib/client/schema';
import type { createContext } from '.';
import type { inferAsyncReturnType } from '@trpc/server';

export default trpc
  .router<inferAsyncReturnType<typeof createContext>>()
  .mutation('register', {
    input: registerSchema,
    resolve: async ({ input }) => {
      try {
        const response = await prisma.user.create({
          data: {
            name: input.name,
            email: input.email,
            passwordHash: await bcrypt.hash(input.password, 10),
          },
          select: { id: true },
        });
        return { success: true, ...response };
      } catch (error) {
        return {
          success: false,
          error: 'Een gebruiker met dit e-mailadres bestaat al.',
        };
      }
    },
  })
  .mutation('login', {
    input: loginSchema,
    resolve: async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      const passwordMatch = user && (await bcrypt.compare(input.password, user.passwordHash));

      if (!user || !passwordMatch)
        return {
          success: false,
          error: 'Onjuist e-mailadres of wachtwoord.',
        };

      const publicUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      };

      const token = jwt.sign(publicUser, JWT_SECRET);

      return { success: true, user: publicUser, token };
    },
  });

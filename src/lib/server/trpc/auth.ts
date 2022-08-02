import * as trpc from '@trpc/server';
import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import { JWT_SECRET, RECAPTCHA_SECRET_KEY, DISABLE_RECAPTCHA } from '$env/static/private';
import jwt from 'jsonwebtoken';

import { loginSchema, registerSchema } from '$lib/client/schema';
import type { Context } from '.';
import { z } from 'zod';

const useRecaptcha = async (recaptchaToken: string) => {
  if (DISABLE_RECAPTCHA === '1') return { success: true, score: 1.0 };

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
  });

  let error: string | null = null;

  if (!response.ok) error = 'De reCAPTCHA-server was niet bereikbaar, probeer het later opnieuw.';
  const { success, score } = await response.json();

  if (!success) error = 'Er is iets misgegaan met reCAPTCHA, probeer het later opnieuw.';
  if (score < 0.5) error = 'reCAPTCHA detecteerde mogelijke spaminteracties, probeer het later opnieuw.';
  if (error) return { return: { success: false, error } };

  return { success, score };
};

export default trpc
  .router<Context>()
  .mutation('register', {
    input: registerSchema.extend({
      recaptchaToken: z.string(),
    }),
    resolve: async ({ input }) => {
      const recaptcha = await useRecaptcha(input.recaptchaToken);
      if (recaptcha.return) return recaptcha.return;

      try {
        const response = await prisma.user.create({
          data: {
            name: input.name,
            email: input.email,
            passwordHash: await bcrypt.hash(input.password, 10),
          },
          select: { id: true },
        });
        return { success: true, error: null, ...response };
      } catch (error) {
        return { success: false, error: 'Een gebruiker met dit e-mailadres bestaat al.' };
      }
    },
  })
  .mutation('login', {
    input: loginSchema.extend({
      recaptchaToken: z.string(),
    }),
    resolve: async ({ input }) => {
      const recaptcha = await useRecaptcha(input.recaptchaToken);
      if (recaptcha.return) return { ...recaptcha.return, token: null };

      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      const passwordMatch = user && (await bcrypt.compare(input.password, user.passwordHash));

      if (!user || !passwordMatch) return { success: false, error: 'Onjuist e-mailadres of wachtwoord.', token: null };

      const jwtUser = {
        id: user.id,
        email: user.email,
        admin: user.admin,
        houseId: user.houseId,
      };

      const token = jwt.sign(jwtUser, JWT_SECRET);

      return { success: true, error: null, user: jwtUser, token };
    },
  });

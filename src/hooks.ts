import { createContext, router } from '$lib/server/trpc';
import { createTRPCHandle } from 'trpc-sveltekit';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { sequence } from '@sveltejs/kit/hooks';
import prisma from './lib/server/prismaClient';

const tRPCHandle: Handle = async ({ event, resolve }) =>
  await createTRPCHandle({
    router,
    createContext,
    event,
    resolve,
  });

const _handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;
  const cookies = parse(headers.get('cookie') ?? '');

  if (cookies.session)
    try {
      const jwtUser = jwt.verify(cookies.session, JWT_SECRET);
      if (typeof jwtUser === 'string') throw Error('Invalid token');
      event.locals.user = await prisma.user.findUnique({
        select: { passwordHash: false },
        where: { id: jwtUser.id },
      });
    } catch {
      console.log('Invalid token');
    }

  return await resolve(event);
};

export const handle = sequence(tRPCHandle, _handle);

export const getSession: GetSession = ({ locals }) => locals;

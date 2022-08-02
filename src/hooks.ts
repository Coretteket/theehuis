import { createContext, router } from '$lib/server/trpc';
import { createTRPCHandle } from 'trpc-sveltekit';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { sequence } from '@sveltejs/kit/hooks';
import prisma from './lib/server/prismaClient';
import { omitKey } from '$lib/util/omitKey';

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
      if (typeof jwtUser === 'string') throw Error();

      const user = await prisma.user.findUnique({ where: { id: jwtUser.id } });
      if (!user) throw Error('User not found');

      event.locals.user = omitKey(user, 'passwordHash');
    } catch (e) {
      console.log(e ?? 'Invalid token');
    }

  return await resolve(event);
};

export const handle = sequence(tRPCHandle, _handle);

export const getSession: GetSession = ({ locals }) => locals;

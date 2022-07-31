import { createContext, router } from '$lib/server/trpc';
import { createTRPCHandle } from 'trpc-sveltekit';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { sequence } from '@sveltejs/kit/hooks';

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
      event.locals.user = jwt.verify(cookies.session, JWT_SECRET);
    } catch {
      console.log('Invalid token');
    }

  return await resolve(event);
};

export const handle = sequence(tRPCHandle, _handle);

export const getSession: GetSession = ({ locals }) => locals;

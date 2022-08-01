import * as trpc from '@trpc/server';
import { TRPCError, type inferAsyncReturnType } from '@trpc/server';
import trpcTransformer from 'trpc-transformer';
import grocery from './grocery';
import auth from './auth';
import type { RequestEvent } from '@sveltejs/kit';
import admin from './admin';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const createContext = async ({ request }: RequestEvent) => {
  const token = cookie.parse(request.headers.get('cookie') ?? '').session;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return { request, user };
  } catch {
    return { request };
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const router = trpc
  .router<Context>()
  .transformer(trpcTransformer)
  .merge('auth:', auth)
  .middleware(({ ctx, next }) => {
    if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return next();
  })
  .merge('grocery:', grocery)
  .middleware(({ ctx, next }) => {
    if (!ctx.user?.admin) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return next();
  })
  .merge('admin:', admin);

export type Router = typeof router;

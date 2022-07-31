import * as trpc from '@trpc/server';
import type { inferAsyncReturnType } from '@trpc/server';
import trpcTransformer from 'trpc-transformer';
import shop from './shop';
import auth from './auth';
import type { RequestEvent } from '@sveltejs/kit';

export const createContext = async ({ request }: RequestEvent) => {
  return { request };
};

export const router = trpc
  .router<inferAsyncReturnType<typeof createContext>>()
  .transformer(trpcTransformer)
  .merge('auth:', auth)
  .merge('shop:', shop);

export type Router = typeof router;

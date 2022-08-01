import { browser } from '$app/env';
import type { Router } from '$lib/server/trpc';
import * as trpc from '@trpc/client';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import trpcTransformer from 'trpc-transformer';
import { PUBLIC_VERCEL } from '$env/static/public';

const url =
  PUBLIC_VERCEL == '1'
    ? 'https://theehuis.qntn.xyz/trpc'
    : import.meta.env.MODE == 'development'
    ? 'http://localhost:5173/trpc'
    : 'http://localhost:4173/trpc';

export default (loadFetch?: typeof fetch) => {
  return trpc.createTRPCClient<Router>({
    url: loadFetch || browser ? '/trpc' : url,
    transformer: trpcTransformer,
    ...(loadFetch && { fetch: loadFetch }),
  });
};

export type Queries = Router['_def']['queries'];
export type Query = keyof Queries;

export type Mutations = Router['_def']['mutations'];
export type Mutation = keyof Mutations;

export type QueryOutput<RouteKey extends Query> = inferProcedureOutput<Queries[RouteKey]>;
export type QueryInput<RouteKey extends Query> = inferProcedureInput<Queries[RouteKey]>;
export type MutationOutput<RouteKey extends Mutation> = inferProcedureOutput<Mutations[RouteKey]>;
export type MutationInput<RouteKey extends Mutation> = inferProcedureInput<Mutations[RouteKey]>;

export type Fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

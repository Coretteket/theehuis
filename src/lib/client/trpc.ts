import { browser } from '$app/env';
import type { Router } from '$lib/server/trpc';
import * as trpc from '@trpc/client';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import trpcTransformer from 'trpc-transformer';

const url = browser ? '/trpc' : 'http://localhost:5173/trpc';

export default (loadFetch?: typeof fetch) =>
  trpc.createTRPCClient<Router>({
    url: loadFetch ? '/trpc' : url,
    transformer: trpcTransformer,
    ...(loadFetch && { fetch: loadFetch }),
  });

export type Queries = Router['_def']['queries'];
export type Query = keyof Queries;

export type Mutations = Router['_def']['mutations'];
export type Mutation = keyof Mutations;

export type QueryOutput<RouteKey extends Query> = inferProcedureOutput<Queries[RouteKey]>;
export type QueryInput<RouteKey extends Query> = inferProcedureInput<Queries[RouteKey]>;
export type MutationOutput<RouteKey extends Mutation> = inferProcedureOutput<Mutations[RouteKey]>;
export type MutationInput<RouteKey extends Mutation> = inferProcedureInput<Mutations[RouteKey]>;

export type Fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

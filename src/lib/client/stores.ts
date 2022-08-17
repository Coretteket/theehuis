import { derived, writable } from 'svelte/store';
import type { QueryOutput } from './trpc';

export const loading = writable(false);

// export const session = writable<{ user: QueryOutput<'user:get'> | null }>({ user: null });

export const user = writable<QueryOutput<'user:get'> | null>(null);

export const session = derived(user, ($user) => ({ user: $user }));

export const loggedIn = derived(user, ($user) => !!$user);

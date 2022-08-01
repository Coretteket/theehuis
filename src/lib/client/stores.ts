import { derived, writable } from 'svelte/store';
import { session } from '$app/stores';

export const loading = writable(false);

export const loggedIn = derived(session, ($session) => !!$session.user);

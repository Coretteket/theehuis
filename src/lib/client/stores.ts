import { derived } from 'svelte/store';
import { session } from '$app/stores';

export const loggedIn = derived(session, ($session) => !!$session.user);

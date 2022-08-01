import { derived, writable } from 'svelte/store';
import { session } from '$app/stores';
import type { SnackbarContainer } from 'attractions';

export const loading = writable(false);

export const loggedIn = derived(session, ($session) => !!$session.user);

export const snackbar = writable<SnackbarContainer>();

const defaultSnackbarProps = {
  action: { text: 'OK', callback: () => close() },
};
export const showSnackbar = derived(snackbar, ($snackbar) => (props: {}) => {
  const showSnackbar = $snackbar.showSnackbar as any;
  return showSnackbar({
    props: { ...props, ...defaultSnackbarProps },
    duration: 4000,
  });
});

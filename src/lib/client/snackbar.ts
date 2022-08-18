import { derived, writable } from 'svelte/store';
import type SnackbarContainer from 'attractions/snackbar/snackbar-container.svelte';

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

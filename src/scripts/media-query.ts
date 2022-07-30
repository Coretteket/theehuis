import { browser } from '$app/env';
import { readable } from 'svelte/store';

export const useMediaQuery = (query: string) =>
	readable(false, (set) => {
		if (browser) {
			const mediaQuery = window.matchMedia(query);
			set(mediaQuery.matches);

			const listener = (e: MediaQueryListEvent) => set(e.matches);
			mediaQuery.addEventListener('change', listener);

			return () => {
				mediaQuery.removeEventListener('change', listener);
			};
		}
	});

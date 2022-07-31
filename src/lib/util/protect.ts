import type { Load } from '@sveltejs/kit';

export const protect = (load?: Load) => (e: Parameters<Load>[0]) => {
  if (!e.session.user) {
    return { status: 302, redirect: '/inloggen' };
  }

  if (load) {
    return load(e);
  }
};
